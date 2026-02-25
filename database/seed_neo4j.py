import os
import sys
import json
import logging

# Setup Django environment to allow standalone script execution
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

from apps.knowledge_graph.graph_builder import KnowledgeGraphBuilder

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_database():
    """
    Reads the base concept JSON and populates the Neo4j graph database.
    """
    json_path = os.path.join(os.path.dirname(__file__), '..', 'datasets', 'base_concept_graph.json')
    
    try:
        with open(json_path, 'r') as file:
            data = json.load(file)
            
        builder = KnowledgeGraphBuilder()
        domain = data.get("domain", "General")
        
        logger.info(f"Starting database seed for domain: {domain}")
        
        for item in data.get("concepts", []):
            target = item["name"]
            
            # 1. Create the main concept
            builder.add_concept(target, domain=domain)
            
            # 2. Link all prerequisites
            for prereq in item.get("requires", []):
                builder.add_concept(prereq, domain=domain) # Ensure prereq exists
                builder.add_prerequisite(prerequisite_name=prereq, target_concept_name=target)
                
        logger.info("Knowledge Graph successfully seeded!")
        
    except FileNotFoundError:
        logger.error(f"Could not find dataset at {json_path}")
    except Exception as e:
        logger.error(f"An error occurred during seeding: {e}")

if __name__ == "__main__":
    seed_database()