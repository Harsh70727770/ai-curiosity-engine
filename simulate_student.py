import os
import sys
import django
from datetime import datetime, timedelta, timezone

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import CustomUser
from apps.knowledge_graph.graph_builder import KnowledgeGraphBuilder
from apps.dashboard.analytics import DashboardAnalytics
from apps.knowledge_graph.graph_client import Neo4jClient

def run_simulation():
    print("\n--- Starting AI Curiosity Engine Simulation ---\n")
    
    # 1. Setup a test user
    username = "test_student"
    user, created = CustomUser.objects.get_or_create(username=username)
    if created:
        user.set_password('password123')
        user.save()
        print(f"Created new user: {username}")
        
    # 2. Simulate learning a concept a long time ago (e.g., 30 days ago)
    print("\nSimulating: User learned 'Calculus' 30 days ago...")
    client = Neo4jClient()
    
    # We manually insert this into Neo4j with an old date to test the Forgetting Curve
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
    query = """
    MERGE (u:User {username: $username})
    MERGE (c:Concept {name: 'calculus'})
    MERGE (u)-[r:STUDIED]->(c)
    SET r.studied_at = datetime($old_date), r.weight = 1
    """
    client.execute_write(query, username=username, old_date=thirty_days_ago.isoformat())
    
    # 3. Simulate learning a concept recently (e.g., today)
    print("Simulating: User learned 'Probability' today...")
    graph_builder = KnowledgeGraphBuilder()
    graph_builder.add_concept('probability')
    graph_builder.link_user_to_concept(username, 'probability') # This defaults to right now
    
    # 4. Run the Analytics Engine to see if the AI catches the memory decay!
    print("\n--- Running Brain Map Analytics ---\n")
    analytics = DashboardAnalytics()
    health_report = analytics.calculate_mental_health_score(username)
    
    print(f"Overall Mental Health Score: {health_report['overall_health_score']}%")
    print("\nStrong Concepts (Retention > 70%):")
    for c in health_report['strong_concepts']:
        print(f"  - {c['name'].title()}: {c['retention']}% retention")
        
    print("\nAt-Risk Concepts (Retention < 70%):")
    for c in health_report['at_risk_concepts']:
        print(f"  - {c['name'].title()}: {c['retention']}% retention  <-- WARNING: FORGETTING IMMINENT!")

if __name__ == "__main__":
    run_simulation()