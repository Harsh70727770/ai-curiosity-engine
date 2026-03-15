import logging
from neo4j import GraphDatabase
from django.conf import settings

logger = logging.getLogger(__name__)


class Neo4jClient:
    """
    Neo4j database client for managing graph database sessions.
    """

    def __init__(self):
        try:
            self.driver = GraphDatabase.driver(
                settings.NEO4J_URI,
                auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
            )

            # Check connection
            self.driver.verify_connectivity()
            logger.info("Neo4j connection established successfully.")

        except Exception as e:
            logger.error(f"Neo4j connection failed: {e}")
            raise e

    def get_session(self):
        """
        Returns a Neo4j session.
        Use this session to run Cypher queries.
        """
        return self.driver.session()

    def close(self):
        """
        Close Neo4j driver connection.
        """
        if self.driver:
            self.driver.close()
            logger.info("Neo4j connection closed.")