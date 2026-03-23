import { useState } from 'react';
import api from '../services/api'; // ✅ changed from axios

export default function Register({ navigateTo }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidPassword = hasLength && hasUpper && hasLower && hasNumber && hasSpecial;

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!isValidPassword) {
            setError("Please ensure your password meets all the security requirements.");
            return; 
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return; 
        }

        setLoading(true);

        try {
            // ✅ FIXED: using api instance + correct endpoint
            const response = await api.post('users/register/', {
                email: email,
                password: password
            });

            alert("Account created successfully! Please log in.");
            navigateTo('login');

        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                setError(JSON.stringify(err.response.data));
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-card" style={{ maxWidth: '450px', margin: '2rem auto', textAlign: 'center' }}>
            <h2 className="section-title" style={{ borderBottom: 'none', marginBottom: '10px' }}>Create an Account</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Start mapping your cognitive knowledge graph.</p>

            {error && <div style={{ color: '#ef4444', marginBottom: '15px', fontWeight: '500' }}>{error}</div>}

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />
                
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />
                
                <div style={{ position: 'relative', width: '100%' }}>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter the password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', boxSizing: 'border-box', padding: '12px', paddingRight: '40px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                    />
                    <span 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
                    >
                        {showPassword ? '👁️' : '🙈'}
                    </span>
                </div>

                <div style={{ fontSize: '0.85rem', textAlign: 'left', color: '#64748b', paddingLeft: '5px', marginTop: '-5px' }}>
                    <div style={{ color: hasLength ? '#16a34a' : '#ef4444' }}>{hasLength ? '✓' : '✗'} Minimum 8 characters</div>
                    <div style={{ color: hasUpper ? '#16a34a' : '#ef4444' }}>{hasUpper ? '✓' : '✗'} At least 1 uppercase letter</div>
                    <div style={{ color: hasLower ? '#16a34a' : '#ef4444' }}>{hasLower ? '✓' : '✗'} At least 1 lowercase letter</div>
                    <div style={{ color: hasNumber ? '#16a34a' : '#ef4444' }}>{hasNumber ? '✓' : '✗'} At least 1 number (0-9)</div>
                    <div style={{ color: hasSpecial ? '#16a34a' : '#ef4444' }}>{hasSpecial ? '✓' : '✗'} At least 1 special symbol</div>
                </div>

                <div style={{ position: 'relative', width: '100%' }}>
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Re-enter the password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{ width: '100%', boxSizing: 'border-box', padding: '12px', paddingRight: '40px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                    />
                    <span 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
                    >
                        {showConfirmPassword ? '👁️' : '🙈'}
                    </span>
                </div>

                <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <div style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#64748b' }}>
                Already have an account?{' '}
                <span 
                    onClick={() => navigateTo('login')} 
                    style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: '600' }}>
                    Log in here
                </span>
            </div>
        </div>
    );
}