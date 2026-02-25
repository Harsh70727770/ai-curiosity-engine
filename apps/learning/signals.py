import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import StudyInteraction
from ai_engine.nlp.topic_extractor import ConceptExtractor
from apps.knowledge_graph.graph_builder import KnowledgeGraphBuilder

logger = logging.getLogger(__name__)

@receiver(post_save, sender=StudyInteraction)
def process_new_interaction(sender, instance, created, **kwargs):
    """
    Automatically triggers whenever a StudyInteraction is saved.
    """
    # Only run this if it's a newly created record that hasn't been processed
    if created and not instance.is_processed_by_ai:
        logger.info(f"Signal triggered for Interaction ID: {instance.id}. Starting AI extraction...")
        
        try:
            # 1. Initialize our AI and Graph tools
            extractor = ConceptExtractor()
            graph_builder = KnowledgeGraphBuilder()
            
            # 2. Extract the concepts from the raw study text
            concepts = extractor.extract_concepts(instance.content_text)
            
            # 3. Save each concept to Neo4j and link it to the user
            username = instance.user.username
            for concept in concepts:
                graph_builder.add_concept(concept)
                graph_builder.link_user_to_concept(username, concept)
            
            # 4. Mark the interaction as processed in PostgreSQL
            # We use .update() here instead of .save() so we don't accidentally trigger this signal again!
            StudyInteraction.objects.filter(id=instance.id).update(is_processed_by_ai=True)
            logger.info(f"Interaction {instance.id} successfully processed and mapped to graph.")
            
        except Exception as e:
            logger.error(f"Failed to process interaction {instance.id}: {e}")

# Note for interviews: In a production environment with heavy traffic, 
# you would move this synchronous signal logic into an asynchronous Celery task 
# so the user doesn't have to wait for the NLP model to finish processing.