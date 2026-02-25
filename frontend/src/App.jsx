import { useState } from 'react';
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
  // This state controls which page is currently visible. We start on 'home'.
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="app-wrapper">
      
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          🧠 AI Curiosity Engine
        </div>
        <div className="nav-links">
          {/* Clicking these changes the currentView state */}
          <span onClick={() => setCurrentView('home')} style={{ color: currentView === 'home' ? '#38bdf8' : '' }}>Home</span>
          <span onClick={() => setCurrentView('about')} style={{ color: currentView === 'about' ? '#38bdf8' : '' }}>About</span>
          <span onClick={() => setCurrentView('contact')} style={{ color: currentView === 'contact' ? '#38bdf8' : '' }}>Contact</span>
          <span onClick={() => setCurrentView('login')} className="portal-btn" style={{ color: currentView === 'portal' || currentView === 'login' ? '#38bdf8' : '' }}>Student Portal</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-container">
        
        {/* Render Home Page */}
        {currentView === 'home' && <Home navigateTo={setCurrentView} />}

        {/* Render About Page */}
        {currentView === 'about' && <About />}

        {/* Render Contact Page */}
        {currentView === 'contact' && <Contact />}

        {/* Auth Pages */}
        {currentView === 'login' && <Login navigateTo={setCurrentView} />}
        {currentView === 'register' && <Register navigateTo={setCurrentView} />}
        {currentView === 'forgot-password' && <ForgotPassword navigateTo={setCurrentView} />}

        {/* Render Student Portal (Your AI Dashboard) */}
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