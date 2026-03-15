import logging
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

class ConceptExtractor:
    """
    Uses SentenceTransformer embeddings to extract semantic
    representations of study text.
    """

    _instance = None
    _model = None

    def __new__(cls):
        # Singleton pattern so model loads only once
        if cls._instance is None:
            cls._instance = super(ConceptExtractor, cls).__new__(cls)

            try:
                logger.info("Loading SentenceTransformer model...")
                cls._model = SentenceTransformer("all-MiniLM-L6-v2")
                logger.info("Model loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load NLP model: {e}")
                raise e

        return cls._instance


    def extract_topics(self, text):
        """
        Converts text into semantic embeddings.

        Args:
            text (str): Input study text

        Returns:
            list: Vector embeddings representing the text
        """

        if not text or len(text.strip()) < 5:
            return []

        try:
            embeddings = self._model.encode(text)

            logger.info("Text embeddings generated successfully.")
            return embeddings.tolist()

        except Exception as e:
            logger.error(f"Embedding generation failed: {e}")
            return []