import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import LearningPath from './components/LearningPath';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [currentView, setCurrentView] = useState('home');

  // ✅ user state
  const [user, setUser] = useState(null);

  // ✅ dropdown state
  const [showMenu, setShowMenu] = useState(false);

  // ✅ check login
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const name = localStorage.getItem('user_name');
    const avatar = localStorage.getItem('user_avatar');

    if (token && name) {
      setUser({ name, avatar });
    }
  }, []);

  // ✅ logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_avatar");

    setUser(null);
    setCurrentView('home');
  };

  return (
    <div className="app-wrapper">
      
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          🧠 AI Curiosity Engine
        </div>

        <div className="nav-links">
          <span onClick={() => setCurrentView('home')} style={{ color: currentView === 'home' ? '#38bdf8' : '' }}>Home</span>
          <span onClick={() => setCurrentView('about')} style={{ color: currentView === 'about' ? '#38bdf8' : '' }}>About</span>
          <span onClick={() => setCurrentView('contact')} style={{ color: currentView === 'contact' ? '#38bdf8' : '' }}>Contact</span>

          {/* ✅ UPDATED USER SECTION */}
          {user ? (
            <div style={{ position: 'relative' }}>
              
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                onClick={() => setShowMenu(!showMenu)}
              >
                <img
                  src={user.avatar}
                  alt="profile"
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #38bdf8'
                  }}
                />

                <span style={{ fontWeight: '600' }}>
                  {user.name}
                </span>
              </div>

              {/* 🔽 DROPDOWN */}
              {showMenu && (
                <div style={{
                  position: 'absolute',
                  top: '45px',
                  right: 0,
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  width: '150px',
                  zIndex: 1000
                }}>
                  
                  <div 
                    style={{ padding: '10px', cursor: 'pointer' }}
                    onClick={() => {
                      setCurrentView('profile');
                      setShowMenu(false);
                    }}
                  >
                    ✏️ Update Profile
                  </div>

                  <div 
                    style={{ padding: '10px', cursor: 'pointer', color: '#ef4444' }}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </div>

                </div>
              )}
            </div>
          ) : (
            <span 
              onClick={() => setCurrentView('login')} 
              className="portal-btn"
              style={{ color: currentView === 'portal' || currentView === 'login' ? '#38bdf8' : '' }}
            >
              Student Portal
            </span>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-container">
        
        {currentView === 'home' && <Home navigateTo={setCurrentView} />}
        {currentView === 'about' && <About />}
        {currentView === 'contact' && <Contact />}

        {currentView === 'login' && <Login navigateTo={setCurrentView} />}
        {currentView === 'register' && <Register navigateTo={setCurrentView} />}
        {currentView === 'forgot-password' && <ForgotPassword navigateTo={setCurrentView} />}

        {currentView === 'portal' && (
            <>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#0f172a' }}>Welcome back.</h1>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Your cognitive knowledge graph is active and monitoring your learning progress.</p>
                </div>

                <div className="app-card">
                    <h2 className="section-title">Cognitive Analytics</h2>
                    <Dashboard />
                </div>
                
                <div className="app-card">
                    <h2 className="section-title">Knowledge Gap Detection</h2>
                    <LearningPath />
                </div>
            </>
        )}

      </main>

      <footer className="footer">
        <p>© 2026 AI Curiosity Engine | Powered by Neo4j & KeyBERT NLP</p>
        <p>Developed for B.Tech Major Project Submission</p>
        <p>Developed by</p>
        <p>Harsh Singh (President - Techno Club)</p>
      </footer>

    </div>
  );
}

export default App;