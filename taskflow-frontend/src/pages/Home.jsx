import { Link } from 'react-router-dom';
import { CheckCircle, Play, Star, ChevronRight, Zap, ShieldCheck, Circle } from 'lucide-react';
import Logo from '../components/Logo';
import '../index.css';

const Home = () => {

  return (
    <div className="landing-page" style={{ overflowX: 'hidden' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
          <Logo size={32} color="var(--accent-color)" />
          <span>TaskFlow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} className="nav-link">Log in</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', borderRadius: '8px' }}>
            Start for free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '4rem 5% 6rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '600px' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Clarity, <br/><span style={{ color: 'var(--text-secondary)' }}>finally.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '500px' }}>
            Join professionals who simplify work and life with the world's #1 to-do list app.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', color: '#ffb800' }}>
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span>337K+ reviews</span>
          </div>

          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 82, 204, 0.4)' }}>
            Start for free
          </Link>
        </div>

        <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
          <div className="hero-image-container" style={{ 
            background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', 
            borderRadius: '24px', 
            padding: '2rem', 
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)',
            transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
            transition: 'transform 0.5s ease'
          }}>
            <div style={{ background: 'var(--card-bg)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Today</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                      <Circle size={20} color="var(--text-secondary)" />
                      <div style={{ flex: 1 }}>
                        <div style={{ height: '8px', width: `${Math.random() * 40 + 40}%`, background: 'var(--text-primary)', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                        <div style={{ height: '6px', width: '30%', background: 'var(--text-secondary)', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '4rem 5%', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          {[
            { quote: "Simple, straightforward, and super powerful", source: "THE VERGE" },
            { quote: "The best to-do list app on the market", source: "PC MAG" },
            { quote: "Nothing short of stellar", source: "techradar" }
          ].map((item, idx) => (
            <div key={idx} style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>"{item.quote}"</p>
              <span style={{ fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.source}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 5%', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap-reverse' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div className="feature-card" style={{ padding: '2rem', background: 'var(--card-bg)', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(54, 179, 126, 0.1)', borderRadius: '12px' }}>
                <CheckCircle color="var(--success-color)" size={24} />
                <span style={{ fontWeight: '500' }}>Craft creative brief</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(0, 82, 204, 0.1)', borderRadius: '12px' }}>
                <CheckCircle color="var(--accent-color)" size={24} />
                <span style={{ fontWeight: '500' }}>Record demo video</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--text-secondary)' }}></div>
                <div style={{ height: '12px', width: '60%', background: 'var(--bg-secondary)', borderRadius: '6px' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px' }}>
          <h4 style={{ color: 'var(--danger-color)', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Clear your mind</h4>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Capture tasks at the speed of thought
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            We've spent years refining TaskFlow to be an extension of your mind. Capture and organize tasks instantly using a simple, flowing interface.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Zap size={20} color="var(--accent-color)" /> Fast and responsive</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><ShieldCheck size={20} color="var(--success-color)" /> Secure and private</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-secondary)', padding: '4rem 2rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', md: 'row', justifyContent: 'space-between', gap: '2rem' }}>
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              <Logo size={24} color="var(--accent-color)" />
              <span>TaskFlow</span>
            </div>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          © {new Date().getFullYear()} TaskFlow Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
