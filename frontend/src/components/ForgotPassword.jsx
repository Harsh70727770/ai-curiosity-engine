import { useState } from 'react';

export default function ForgotPassword({ navigateTo }) {
    const [email, setEmail] = useState('');

    const handleReset = (e) => {
        e.preventDefault();
        alert(`Password reset link sent to ${email}`);
        navigateTo('login');
    };

    return (
        <div className="app-card" style={{ maxWidth: '450px', margin: '2rem auto', textAlign: 'center' }}>
            <h2 className="section-title" style={{ borderBottom: 'none', marginBottom: '10px' }}>Reset Password</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Enter your email and we'll send you a link to reset your password.</p>

            <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />

                <button type="submit" style={{ padding: '12px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    Send Reset Link
                </button>
            </form>

            <div style={{ marginTop: '2rem', fontSize: '0.95rem' }}>
                <span 
                    onClick={() => navigateTo('login')} 
                    style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: '600' }}>
                    ← Back to Login
                </span>
            </div>
        </div>
    );
}