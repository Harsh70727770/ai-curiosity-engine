export default function Home({ navigateTo }) {
    return (
        <div className="app-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h1 style={{ fontSize: '3rem', color: '#0f172a', marginBottom: '1rem' }}>
                🧠 AI Curiosity Engine
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                A cognitive modeling platform designed to convert abstract learning goals into highly personalized, actionable learning paths.
            </p>
            <button 
                onClick={() => navigateTo('login')}
                style={{ padding: '15px 30px', fontSize: '1.1rem', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(14, 165, 233, 0.2)' }}>
                Enter Student Portal
            </button>
        </div>
    );
}