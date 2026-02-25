import logging
from apps.knowledge_graph.graph_client import Neo4jClient
from ai_engine.behavior_analysis.forgetting_curve import ForgettingCurveModel

logger = logging.getLogger(__name__)

class DashboardAnalytics:
    """
    Aggregates user data from the graph to calculate real-time cognitive metrics.
    """
    def __init__(self):
        self.client = Neo4jClient()
        self.memory_model = ForgettingCurveModel()

    def calculate_mental_health_score(self, username):
        """
        Calculates the overall retention health of the user's knowledge graph.
        
        Returns:
            dict: Contains the overall score, strong concepts, and at-risk concepts.
        """
        # Query Neo4j to get every concept the user has studied, 
        # including when they last studied it and how many times (weight)
        query = """
        MATCH (u:User {username: $username})-[r:STUDIED]->(c:Concept)
        RETURN c.name AS concept, r.studied_at AS last_studied, r.weight AS review_count
        """
        
        try:
            results = self.client.execute_read(query, username=username.strip())
            
            if not results:
                return {
                    "overall_health_score": 0,
                    "strong_concepts": [],
                    "at_risk_concepts": [],
                    "message": "No study data found. Start learning to build your graph!"
                }

            total_retention = 0.0
            strong_concepts = []
            at_risk_concepts = []
            
            # Run each concept through the Forgetting Curve AI
            for record in results:
                concept = record['concept']
                last_studied = record['last_studied']
                review_count = record.get('review_count', 1)
                
                # Neo4j datetime objects might need conversion to Python datetimes
                if hasattr(last_studied, 'to_native'):
                    last_studied = last_studied.to_native()

                retention_score = self.memory_model.calculate_retention(
                    last_reviewed_date=last_studied, 
                    review_count=review_count
                )
                
                total_retention += retention_score
                
                # Categorize concepts based on memory decay
                concept_data = {"name": concept, "retention": round(retention_score * 100, 1)}
                if retention_score >= 0.70:
                    strong_concepts.append(concept_data)
                else:
                    at_risk_concepts.append(concept_data)

            # Calculate the average retention across the entire brain map
            average_retention = total_retention / len(results)
            overall_score = round(average_retention * 100, 1)
            
            # Sort the at-risk concepts so the most forgotten ones are at the top
            at_risk_concepts = sorted(at_risk_concepts, key=lambda x: x['retention'])

            logger.info(f"User {username} Mental Health Score: {overall_score}%")
            
            return {
                "overall_health_score": overall_score,
                "strong_concepts": strong_concepts,
                "at_risk_concepts": at_risk_concepts, # The frontend will use this to suggest immediate reviews!
                "total_concepts_learned": len(results)
            }
            
        except Exception as e:
            logger.error(f"Error calculating analytics for {username}: {e}")
            return {"error": "Could not calculate analytics."}