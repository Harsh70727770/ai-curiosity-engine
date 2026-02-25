# 🧠 AI Curiosity Engine

**Author:** Harsh Singh  
**Program:** B.Tech Computer Science and Engineering (AI & Machine Learning)  
**Institution:** Kashi Institute of Technology (KIT)  

## 📌 Overview
The AI Curiosity Engine is a cognitive modeling platform designed to convert abstract learning goals into highly personalized, actionable learning paths. Instead of relying on static course playlists, this engine actively reads study material, maps knowledge to a graph database, identifies foundational gaps, and predicts memory decay over time. 

This repository serves as the major project submission, demonstrating complex systems architecture, natural language processing, and graph-based reasoning.

## 🚀 Key Features
* **Automated Concept Extraction:** Uses Hugging Face KeyBERT (Transformer embeddings) to read user interactions and extract compound educational concepts.
* **Dynamic Knowledge Graph:** Leverages Neo4j to build a living mental model for each user, mapping their exact understanding of prerequisites.
* **Graph-Based Gap Detection:** Uses Cypher queries to traverse the graph and calculate exactly which foundational concepts a user is missing before tackling advanced topics.
* **Ebbinghaus Forgetting Curve:** A mathematical simulation running on the backend that calculates memory retention scores and flags concepts at risk of being forgotten.

## 🛠️ Tech Stack
* **Backend Framework:** Django / Django REST Framework
* **Graph Database:** Neo4j (Cypher Query Language)
* **Relational Database:** PostgreSQL (User data & raw interactions)
* **Artificial Intelligence:** KeyBERT, Sentence-Transformers
* **Frontend Visualization:** React.js, Vite, Axios

## ⚙️ Local Installation
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/ai-curiosity-engine.git](https://github.com/yourusername/ai-curiosity-engine.git)
   cd ai-curiosity-engine

2. **Set up the virtual environment & install dependencies:**

python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

3.**Configure the Databases:**

Ensure PostgreSQL is running.

Ensure Neo4j (Desktop or AuraDB) is active.

Update the credentials in config/settings.py.

4.**Run migrations and seed the Knowledge Graph:**

python manage.py migrate
python database/seed_neo4j.py

5.**Start the Engine:**

# Terminal 1: Django Backend
python manage.py runserver

# Terminal 2: React Frontend
cd frontend
npm run dev

This presentation immediately frames the project as a sophisticated piece of software engineering rather than a basic web app. 
