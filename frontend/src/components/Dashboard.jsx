import { useState, useEffect } from 'react';
import api from '../services/api'; // <-- Changed to import our new custom api interceptor

export default function Dashboard() {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the AI analytics from Django when the component loads
        // <-- Changed to use api.get() instead of getDashboardMetrics()
        api.get('dashboard/metrics/')
            .then(response => {
                setMetrics(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching metrics:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading AI Engine Analytics...</div>;
    if (!metrics || metrics.error) return <div>No data available. Start studying!</div>;

    return (
        <div>
            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#0f172a' }}>Overall Mental Health Score: <span style={{ color: '#0284c7' }}>{metrics.overall_health_score}%</span></h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Total Concepts Mapped: {metrics.total_concepts_learned}</p>
            </div>

            {/* Changed to use className="dashboard-grid" */}
            <div className="dashboard-grid">
                {/* Changed to use className="concept-box" */}
                <div className="concept-box" style={{ borderTop: '4px solid #ef4444' }}>
                    <h3 style={{ color: '#ef4444', marginTop: 0 }}>⚠️ At Risk (Review Needed)</h3>
                    <p style={{ fontSize: '0.9em', color: '#666' }}>Our forgetting curve predicts memory decay for these concepts.</p>
                    <ul style={{ paddingLeft: '20px' }}>
                        {metrics.at_risk_concepts.map((concept, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>
                                <strong>{concept.name}</strong> - Retention: {concept.retention}%
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Changed to use className="concept-box" */}
                <div className="concept-box" style={{ borderTop: '4px solid #22c55e' }}>
                    <h3 style={{ color: '#22c55e', marginTop: 0 }}>✅ Strong Concepts</h3>
                    <p style={{ fontSize: '0.9em', color: '#666' }}>You have a solid grasp on these topics.</p>
                    <ul style={{ paddingLeft: '20px' }}>
                        {metrics.strong_concepts.map((concept, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>
                                <strong>{concept.name}</strong> - Retention: {concept.retention}%
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}