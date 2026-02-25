export default function Contact() {
    // We encode the message so the web browser can read the spaces and punctuation correctly
    const defaultMessage = encodeURIComponent("Hello Sir , I want your help !!");

    return (
        <div className="app-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
            <h2 className="section-title">Get in Touch</h2>
            <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Hi, I'm Harsh Singh. Feel free to reach out to discuss AI, machine learning, the Techno Club, or potential collaborations!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* LinkedIn Button (Links to profile) */}
                <a href="https://linkedin.com/in/harsh-singh-ba1436259 " target="_blank" rel="noopener noreferrer" 
                   style={{ display: 'block', padding: '15px', backgroundColor: '#0077b5', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', boxShadow: '0 4px 6px rgba(0, 119, 181, 0.2)' }}>
                    💼 Connect on LinkedIn
                </a>

                {/* Instagram Button (Links to profile) */}
                <a href="https://instagram.com/h.arsh143" target="_blank" rel="noopener noreferrer"
                   style={{ display: 'block', padding: '15px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', boxShadow: '0 4px 6px rgba(220, 39, 67, 0.2)' }}>
                    📸 Follow on Instagram
                </a>

                {/* WhatsApp Button (WITH PRE-FILLED MESSAGE!) */}
                {/* Replace 910000000000 with your actual country code + phone number */}
                <a href={`https://wa.me/918840216515?text=${defaultMessage}`} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'block', padding: '15px', backgroundColor: '#25D366', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', boxShadow: '0 4px 6px rgba(37, 211, 102, 0.2)' }}>
                    💬 Message on WhatsApp
                </a>

            </div>
        </div>
    );
}