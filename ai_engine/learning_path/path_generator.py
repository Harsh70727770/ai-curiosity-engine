import logging
from apps.knowledge_graph.graph_client import Neo4jClient

logger = logging.getLogger(__name__)

class LearningPathGenerator:
    """
    Takes a list of missing concepts and uses graph traversal to order them
    into a logical, step-by-step learning roadmap.
    """
    def __init__(self):
        self.client = Neo4jClient()

    def generate_path(self, target_concept, missing_concepts):
        """
        Orders missing concepts by their depth in the prerequisite tree.
        """
        if not missing_concepts:
            return [target_concept]

        # This Cypher query calculates the prerequisite depth
        query = """
        UNWIND $missing_concepts AS missing_name
        MATCH (target:Concept {name: $target_name})
        MATCH (missing:Concept {name: missing_name})
        
        // Find the path from the Target down to the Missing concept
        MATCH p = shortestPath((target)-[:REQUIRES*]->(missing))
        
        // The longer the path (depth), the earlier it needs to be learned
        RETURN missing.name AS concept, length(p) AS depth
        ORDER BY depth DESC
        """
        try:
            result = self.client.execute_read(
                query,
                target_name=target_concept.lower().strip(),
                missing_concepts=missing_concepts
            )
            
            # Extract the ordered concepts from the database response
            ordered_path = [record['concept'] for record in result]
            
            # Always append the final target concept at the very end of the roadmap
            if target_concept not in ordered_path:
                ordered_path.append(target_concept)
                
            logger.info(f"Generated dynamic learning path: {ordered_path}")
            return ordered_path
            
        except Exception as e:
            logger.error(f"Error generating path for {target_concept}: {e}")
            # Fallback in case of database error
            return missing_concepts + [target_concept]