import logging
from .graph_client import Neo4jClient

logger = logging.getLogger(__name__)


def get_client():
    return Neo4jClient()


class KnowledgeGraphBuilder:

    def __init__(self):
        self.client = get_client()

    def add_concept(self, concept_name, domain="General"):
        """
        Creates a Concept node using MERGE to avoid duplicates.
        """

        query = """
        MERGE (c:Concept {name: $name})
        ON CREATE SET c.domain = $domain, c.created_at = datetime()
        RETURN c.name AS name, c.domain AS domain
        """

        try:
            with self.client.get_session() as session:
                result = session.run(
                    query,
                    name=concept_name.lower().strip(),
                    domain=domain
                )

                data = [record.data() for record in result]

            logger.info(f"Concept '{concept_name}' added/verified in graph.")
            return data

        except Exception as e:
            logger.error(f"Error adding concept {concept_name}: {e}")
            return None


    def add_prerequisite(self, prerequisite_name, target_concept_name):
        """
        Creates relationship:
        (Target Concept) -[REQUIRES]-> (Prerequisite Concept)
        """

        query = """
        MERGE (pre:Concept {name: $pre_name})
        MERGE (target:Concept {name: $target_name})
        MERGE (target)-[r:REQUIRES]->(pre)
        RETURN type(r) AS relationship
        """

        try:
            with self.client.get_session() as session:
                result = session.run(
                    query,
                    pre_name=prerequisite_name.lower().strip(),
                    target_name=target_concept_name.lower().strip()
                )

                data = [record.data() for record in result]

            logger.info(f"Linked '{target_concept_name}' -> requires -> '{prerequisite_name}'.")
            return data

        except Exception as e:
            logger.error(f"Error linking {target_concept_name} to {prerequisite_name}: {e}")
            return None


    def link_user_to_concept(self, username, concept_name):
        """
        Creates relationship:
        (User) -[STUDIED]-> (Concept)
        """

        query = """
        MERGE (u:User {username: $username})
        MERGE (c:Concept {name: $concept_name})
        MERGE (u)-[r:STUDIED]->(c)
        ON CREATE SET r.studied_at = datetime(), r.weight = 1
        ON MATCH SET r.weight = r.weight + 1
        RETURN type(r)
        """

        try:
            with self.client.get_session() as session:
                session.run(
                    query,
                    username=username.strip(),
                    concept_name=concept_name.lower().strip()
                )

            logger.info(f"Linked User '{username}' -> STUDIED -> Concept '{concept_name}'.")

        except Exception as e:
            logger.error(f"Error linking user {username} to {concept_name}: {e}")