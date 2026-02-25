export default function About() {
    return (
        <div className="app-card">
            <h2 className="section-title">📌 Overview</h2>
            <p style={{ marginBottom: '1.5rem', color: '#334155', lineHeight: '1.8', fontSize: '1.05rem' }}>
                The AI Curiosity Engine is a cognitive modeling platform designed to convert abstract learning goals into highly personalized, actionable learning paths. Instead of relying on static course playlists, this engine actively reads study material, maps knowledge to a graph database, identifies foundational gaps, and predicts memory decay over time.
            </p>
            <p style={{ marginBottom: '2.5rem', color: '#334155', lineHeight: '1.8', fontSize: '1.05rem' }}>
                This repository serves as the major project submission, demonstrating complex systems architecture, natural language processing, and graph-based reasoning.
            </p>

            <h2 className="section-title">🚀 Key Features</h2>
            <ul style={{ paddingLeft: '20px', color: '#334155', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <li style={{ marginBottom: '15px' }}>
                    <strong>Automated Concept Extraction:</strong> Uses Hugging Face KeyBERT (Transformer embeddings) to read user interactions and extract compound educational concepts.
                </li>
                <li style={{ marginBottom: '15px' }}>
                    <strong>Dynamic Knowledge Graph:</strong> Leverages Neo4j to build a living mental model for each user, mapping their exact understanding of prerequisites.
                </li>
                <li style={{ marginBottom: '15px' }}>
                    <strong>Graph-Based Gap Detection:</strong> Uses Cypher queries to traverse the graph and calculate exactly which foundational concepts a user is missing before tackling advanced topics.
                </li>
                <li style={{ marginBottom: '15px' }}>
                    <strong>Ebbinghaus Forgetting Curve:</strong> A mathematical simulation running on the backend that calculates memory retention scores and flags concepts at risk of being forgotten.
                </li>
            </ul>
        </div>
    );
}