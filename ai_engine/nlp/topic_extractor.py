import logging
from keybert import KeyBERT

logger = logging.getLogger(__name__)

class ConceptExtractor:
    """
    Uses Transformer-based embeddings to extract key educational concepts
    from raw study text.
    """
    _instance = None
    _model = None

    def __new__(cls):
        # We use the Singleton pattern here so the heavy AI model 
        # only loads into memory once when the server starts!
        if cls._instance is None:
            cls._instance = super(ConceptExtractor, cls).__new__(cls)
            try:
                logger.info("Loading Transformer model for Concept Extraction...")
                # 'all-MiniLM-L6-v2' is a fast, highly efficient sentence embedding model
                cls._model = KeyBERT(model='all-MiniLM-L6-v2') 
                logger.info("Model loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load NLP model: {e}")
                raise e
        return cls._instance

    def extract_concepts(self, text, top_n=5, threshold=0.3):
        """
        Analyzes the text and returns a list of core concepts.
        
        Args:
            text (str): The raw notes or article the user read.
            top_n (int): Maximum number of concepts to extract.
            threshold (float): Minimum confidence score to be considered a concept.
            
        Returns:
            list: A list of string concepts (e.g., ['machine learning', 'linear algebra'])
        """
        if not text or len(text.strip()) < 10:
            return []

        # Extract keywords using the transformer model
        # keyphrase_ngram_range=(1, 2) allows for two-word concepts like "linear algebra"
        keywords = self._model.extract_keywords(
            text, 
            keyphrase_ngram_range=(1, 2), 
            stop_words='english', 
            top_n=top_n
        )
        
        # Filter concepts based on the confidence score threshold
        valid_concepts = []
        for concept, score in keywords:
            if score >= threshold:
                valid_concepts.append(concept.lower().strip())
                
        logger.info(f"Extracted concepts: {valid_concepts}")
        return valid_concepts