import { useState } from 'react';
import api from '../services/api'; // ✅ FIXED

export default function Login({ navigateTo }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // ✅ FIXED (Railway backend use hoga now)
            const response = await api.post('users/login/', {
                username: email,
                password: password
            });

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            navigateTo('portal'); 
            
        } catch (err) {
            console.error(err);
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-card" style={{ maxWidth: '450px', margin: '2rem auto', textAlign: 'center' }}>
            <h2 className="section-title" style={{ borderBottom: 'none', marginBottom: '10px' }}>Welcome Back</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Sign in to access your cognitive analytics.</p>

            {error && <div style={{ color: '#ef4444', marginBottom: '15px', fontWeight: '500' }}>{error}</div>}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />
                
                <div style={{ textAlign: 'right' }}>
                    <span 
                        onClick={() => navigateTo('forgot-password')} 
                        style={{ color: '#38bdf8', fontSize: '0.9rem', cursor: 'pointer', fontWeight: '500' }}>
                        Forgot Password?
                    </span>
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    style={{
                        padding: '12px',
                        backgroundColor: '#0f172a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1.1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        marginTop: '10px'
                    }}
                >
                    {loading ? 'Authenticating...' : 'Log In'}
                </button>
            </form>

            <div style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#64748b' }}>
                Don't have an account?{' '}
                <span 
                    onClick={() => navigateTo('register')} 
                    style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: '600' }}>
                    Register here
                </span>
            </div>
        </div>
    );
}