import logging
from neo4j import GraphDatabase
from django.conf import settings

logger = logging.getLogger(__name__)

class Neo4jClient:
    """
    Singleton client to manage the Neo4j database connection.
    """
    _instance = None
    _driver = None

    def __new__(cls):
        # Create the instance only if it doesn't already exist
        if cls._instance is None:
            cls._instance = super(Neo4jClient, cls).__new__(cls)
            try:
                # Initialize the driver
                cls._driver = GraphDatabase.driver(
                    settings.NEO4J_URI, 
                    auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
                )
                # Verify connectivity immediately to catch credential or network errors
                cls._driver.verify_connectivity()
                logger.info("Successfully established connection to Neo4j.")
            except Exception as e:
                logger.error(f"Failed to connect to Neo4j: {e}")
                raise e
        return cls._instance

    def get_driver(self):
        return self._driver

    def close(self):
        """Always close the driver object to free up allocated resources"""
        if self._driver is not None:
            self._driver.close()
            logger.info("Neo4j connection closed.")

    # --- Utility Methods for Explicit Transactions ---
    
    def execute_read(self, query, **parameters):
        """Executes a read-only Cypher query and returns the data."""
        with self._driver.session() as session:
            result = session.execute_read(lambda tx: tx.run(query, **parameters).data())
            return result

    def execute_write(self, query, **parameters):
        """Executes a write Cypher query and returns the data."""
        with self._driver.session() as session:
            result = session.execute_write(lambda tx: tx.run(query, **parameters).data())
            return result