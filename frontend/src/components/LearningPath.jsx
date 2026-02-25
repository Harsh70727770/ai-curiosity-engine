import { useState } from 'react';
import api from '../services/api'; // <-- Changed to import the custom api interceptor

export default function LearningPath() {
    const [concept, setConcept] = useState('');
    const [pathData, setPathData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPathData(null);

        try {
            // This triggers your Django backend AI logic with the JWT token attached!
            // Note: If your Django url for this is slightly different (like 'recommendations/generate/'), 
            // just update the string below to match your exact urls.py setup.
            const response = await api.post('recommendations/what-to-study-next/', { target_concept: concept });
            
            setPathData(response.data);
        } catch (err) {
            console.error("Error fetching learning path:", err);
            setError('Failed to fetch the learning path. Check your Django terminal for errors.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Changed to use className="search-form" */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Type a goal (e.g., machine learning)"
                    className="search-input"
                    required
                />
                <button type="submit" className="search-button">
                    {loading ? 'Calculating...' : 'Generate Roadmap'}
                </button>
            </form>
            
            {error && <p style={{ color: '#ef4444', fontWeight: '500', marginTop: '10px' }}>{error}</p>}

            {pathData && (
                <div style={{ 
                    padding: '15px 20px', 
                    // Change border and background to green if status is 'ready'
                    border: pathData.status === 'ready' ? '1px solid #bbf7d0' : '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    background: pathData.status === 'ready' ? '#f0fdf4' : '#f8fafc', 
                    marginTop: '20px' 
                }}>
                    <p style={{ 
                        color: pathData.status === 'ready' ? '#16a34a' : '#d97706', 
                        margin: 0, 
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                    }}>
                        {pathData.message}
                    </p>
                    
                    {pathData.status === 'gaps_detected' && (
                        <>
                            <h4 style={{ marginTop: '15px', color: '#1e293b' }}>Your Step-by-Step Roadmap:</h4>
                            <ol style={{ lineHeight: '1.8', fontSize: '1.1em', paddingLeft: '20px', color: '#334155' }}>
                                {pathData.learning_path.map((step, index) => (
                                    <li key={index} style={{ marginBottom: '8px' }}>
                                        <strong>{step.toUpperCase()}</strong>
                                        {index === pathData.learning_path.length - 1 && ' (Target Goal)'}
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}