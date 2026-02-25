# AI Curiosity Engine

An AI system that predicts what a learner should study next instead of recommending popular content.

The system models a user's knowledge as a concept graph, detects missing prerequisites, and generates a dynamic learning path to prevent learning gaps.

---

## Core Idea
Most learning platforms recommend content based on interest.
This project recommends learning based on knowledge deficiency.

---

## Features
- Concept extraction using NLP
- Personal knowledge graph generation
- Knowledge gap detection
- Dynamic learning path generation
- Progress dashboard

---

## Tech Stack

Backend:
- Django
- Django REST Framework
- Python

AI:
- Transformers
- Sentence Embeddings
- Graph reasoning

Database:
- PostgreSQL
- Neo4j

Frontend:
- React

---

## Setup Instructions

### 1. Create virtual environment
       python -m venv venv
### 2. Activate
       Windows: venv\Scripts\activate
### 3. Install dependencies
       pip install -r requirements.txt
### 4. Run server
       python manage.py runserver

---

## Future Scope
- Personalized AI mentor
- Forgetting prediction
- Adaptive curriculum generation
