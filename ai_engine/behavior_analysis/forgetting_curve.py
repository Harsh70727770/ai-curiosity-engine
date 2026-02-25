import math
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

class ForgettingCurveModel:
    """
    Simulates a learner's memory decay over time to predict when they 
    are about to forget a foundational concept.
    """
    
    def __init__(self, base_strength=1.0):
        # Base memory strength for a concept learned for the very first time
        self.base_strength = base_strength

    def calculate_retention(self, last_reviewed_date, review_count):
        """
        Calculates the current probability that the user still remembers the concept.
        
        Args:
            last_reviewed_date (datetime): The exact time the user last studied this.
            review_count (int): How many times the user has studied this concept.
            
        Returns:
            float: A retention score between 0.0 (forgotten) and 1.0 (perfect recall).
        """
        if not last_reviewed_date or review_count < 1:
            return 0.0
            
        # 1. Calculate the time elapsed in hours (t)
        now = datetime.now(timezone.utc)
        
        # Handle naive datetimes just in case they come from the database without timezone info
        if last_reviewed_date.tzinfo is None:
            last_reviewed_date = last_reviewed_date.replace(tzinfo=timezone.utc)
            
        time_elapsed = now - last_reviewed_date
        t_hours = max(time_elapsed.total_seconds() / 3600.0, 0)
        
        # 2. Calculate Memory Strength (S)
        # Every time a user reviews a concept, their memory strength grows exponentially.
        # A review_count of 1 means they just learned it. A count of 3 means it's deeply embedded.
        strength = self.base_strength * (1.8 ** (review_count - 1))
        
        # We multiply strength by a decay factor (e.g., 24 hours) to scale the curve 
        # so it makes sense for long-term learning rather than minute-by-minute testing.
        S = strength * 24.0 
        
        # 3. Apply the Ebbinghaus Exponential Decay Formula: R = e^(-t/S)
        try:
            retention = math.exp(-t_hours / S)
        except OverflowError:
            retention = 0.0 # If time is infinitely massive, retention is 0
            
        # We set a floor of 10% because human brains rarely forget 100% of a concept
        final_retention = max(round(retention, 3), 0.10)
        
        logger.debug(f"Concept Retention: {final_retention} | Hours Elapsed: {round(t_hours,1)} | Reviews: {review_count}")
        return final_retention