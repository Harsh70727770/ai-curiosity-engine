import logging
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

# Lazy loaded model
_model = None


def get_model():
    global _model
    if _model is None:
        try:
            logger.info("Loading SentenceTransformer model...")
            _model = SentenceTransformer("all-MiniLM-L6-v2")
            logger.info("Model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load NLP model: {e}")
            raise e
    return _model


class ConceptExtractor:
    """
    Uses SentenceTransformer embeddings to extract semantic
    representations of study text.
    """

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
            # Step 5: Use lazy-loaded model
            model = get_model()
            embeddings = model.encode(text)

            logger.info("Text embeddings generated successfully.")
            return embeddings.tolist()

        except Exception as e:
            logger.error(f"Embedding generation failed: {e}")
            return []