import logging
import os
import requests

logger = logging.getLogger(__name__)

API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2"

HF_API_TOKEN = os.environ.get("HF_API_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_API_TOKEN}"
}


class ConceptExtractor:
    """
    Uses HuggingFace Inference API to generate embeddings
    instead of loading heavy local models.
    """

    def extract_topics(self, text):

        if not text or len(text.strip()) < 5:
            return []

        try:
            response = requests.post(
                API_URL,
                headers=headers,
                json={"inputs": text}
            )

            embeddings = response.json()

            logger.info("Embeddings generated via HuggingFace API")

            return embeddings

        except Exception as e:
            logger.error(f"Embedding generation failed: {e}")
            return []