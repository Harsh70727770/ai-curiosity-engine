import logging
from apps.knowledge_graph.graph_client import Neo4jClient

logger = logging.getLogger(__name__)

class GapDetector:
    """
    Analyzes the user's mental model against the global knowledge graph
    to identify missing foundational concepts.
    """
    def __init__(self):
        self.client = Neo4jClient()

    def detect_missing_prerequisites(self, username, target_concept):
        """
        Calculates the knowledge deficiency for a specific concept.
        
        Args:
            username (str): The user's ID/username.
            target_concept (str): The concept they want to learn (e.g., 'machine learning').
            
        Returns:
            list: A list of missing prerequisite concepts.
        """
        # This Cypher query is the heart of your gap detection
        query = """
        // 1. Find the target concept and all concepts it REQUIRES
        MATCH (target:Concept {name: $target_name})-[:REQUIRES]->(pre:Concept)
        
        // 2. Check if the specific user has a STUDIED relationship with those prerequisites
        OPTIONAL MATCH (u:User {username: $username})-[s:STUDIED]->(pre)
        
        // 3. If the STUDIED relationship 's' is NULL, it means the user hasn't learned it yet!
        WITH pre, s
        WHERE s IS NULL
        
        // 4. Return the names of the missing concepts
        RETURN pre.name AS missing_concept
        """
        try:
            result = self.client.execute_read(
                query, 
                username=username.strip(), 
                target_name=target_concept.lower().strip()
            )
            
            missing_concepts = [record['missing_concept'] for record in result]
            
            if missing_concepts:
                logger.info(f"Gap Detected! User '{username}' needs to study {missing_concepts} before '{target_concept}'.")
            else:
                logger.info(f"User '{username}' has all prerequisites for '{target_concept}'.")
                
            return missing_concepts
            
        except Exception as e:
            logger.error(f"Error detecting gaps for {username} on {target_concept}: {e}")
            return []