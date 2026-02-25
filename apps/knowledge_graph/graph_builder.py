import logging
from .graph_client import Neo4jClient

logger = logging.getLogger(__name__)

class KnowledgeGraphBuilder:
    def __init__(self):
        self.client = Neo4jClient()

    def add_concept(self, concept_name, domain="General"):
        """
        Creates a new Concept node in the graph. 
        Uses MERGE so it doesn't create duplicates if the concept already exists.
        """
        query = """
        MERGE (c:Concept {name: $name})
        ON CREATE SET c.domain = $domain, c.created_at = datetime()
        RETURN c.name AS name, c.domain AS domain
        """
        try:
            # We lowercase the name to keep our graph data clean and consistent
            result = self.client.execute_write(query, name=concept_name.lower().strip(), domain=domain)
            logger.info(f"Concept '{concept_name}' added/verified in graph.")
            return result
        except Exception as e:
            logger.error(f"Error adding concept {concept_name}: {e}")
            return None

    def add_prerequisite(self, prerequisite_name, target_concept_name):
        """
        Creates a REQUIRES relationship: (Target Concept) -[REQUIRES]-> (Prerequisite Concept)
        Example: (Machine Learning) -[REQUIRES]-> (Linear Algebra)
        """
        query = """
        // First, ensure both nodes exist
        MERGE (pre:Concept {name: $pre_name})
        MERGE (target:Concept {name: $target_name})
        
        // Draw the relationship arrow from Target pointing to Prerequisite
        MERGE (target)-[r:REQUIRES]->(pre)
        RETURN type(r) AS relationship
        """
        try:
            result = self.client.execute_write(
                query, 
                pre_name=prerequisite_name.lower().strip(), 
                target_name=target_concept_name.lower().strip()
            )
            logger.info(f"Linked '{target_concept_name}' -> requires -> '{prerequisite_name}'.")
            return result
        except Exception as e:
            logger.error(f"Error linking {target_concept_name} to {prerequisite_name}: {e}")
            return None
            
    def link_user_to_concept(self, username, concept_name):
        """
        Creates a relationship showing a user has studied a concept.
        (User) -[STUDIED]-> (Concept)
        """
        query = """
        MERGE (u:User {username: $username})
        MERGE (c:Concept {name: $concept_name})
        MERGE (u)-[r:STUDIED]->(c)
        ON CREATE SET r.studied_at = datetime(), r.weight = 1
        ON MATCH SET r.weight = r.weight + 1 // Increase weight if studied again
        RETURN type(r)
        """
        try:
            self.client.execute_write(
                query, 
                username=username.strip(), 
                concept_name=concept_name.lower().strip()
            )
            logger.info(f"Linked User '{username}' -> STUDIED -> Concept '{concept_name}'.")
        except Exception as e:
            logger.error(f"Error linking user {username} to {concept_name}: {e}")