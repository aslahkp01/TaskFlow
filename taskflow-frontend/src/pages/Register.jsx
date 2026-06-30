import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/authSlice';
import Logo from '../components/Logo';
import '../index.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await dispatch(register({ name, email, password }));
    if (!res.error) {
      navigate('/verify-otp', { state: { email } });
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: 'var(--bg-primary)' }}>
      {/* Left Column - Form */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '4rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)', textDecoration: 'none' }}>
            <Logo size={28} color="currentColor" />
            <span>TaskFlow</span>
          </Link>
        </div>

        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Create an account
          </h1>
          
          {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="input-group">
              <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' }}>Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ background: 'transparent' }}
              />
            </div>
            <div className="input-group">
              <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' }}>Email</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ background: 'transparent' }}
              />
            </div>
            <div className="input-group">
              <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' }}>Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="Create a password (min 6 chars)..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={{ background: 'transparent' }}
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ 
              marginTop: '0.5rem', 
              fontWeight: 'bold', 
              padding: '0.75rem', 
              fontSize: '1rem',
              width: '100%'
            }}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          
          <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '500' }}>Log in</Link>
          </div>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="login-illustration" style={{ 
        flex: '1', 
        backgroundColor: 'var(--bg-secondary)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '2rem',
        borderLeft: '1px solid var(--border-color)'
      }}>
        <div style={{ width: '100%', maxWidth: '500px', aspectRatio: '1/1', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '15%', right: '10%', width: '250px', height: '250px', background: 'rgba(54, 179, 126, 0.05)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '20%', left: '15%', width: '200px', height: '200px', background: 'rgba(0, 82, 204, 0.05)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', width: '80%', zIndex: 10 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ height: '8px', width: '40%', background: 'var(--text-primary)', borderRadius: '4px' }}></div>
              <div style={{ height: '8px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '4px' }}></div>
              <div style={{ height: '8px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '4px' }}></div>
              <div style={{ height: '8px', width: '80%', background: 'var(--bg-secondary)', borderRadius: '4px', marginBottom: '1rem' }}></div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ height: '40px', width: '100%', background: 'rgba(54, 179, 126, 0.1)', borderRadius: '8px', border: '1px dashed var(--success-color)' }}></div>
                <div style={{ height: '40px', width: '100%', background: 'rgba(0, 82, 204, 0.1)', borderRadius: '8px', border: '1px dashed var(--accent-color)' }}></div>
              </div>
            </div>
            
          </div>
          {/* Sparkles */}
          <div style={{ position: 'absolute', top: '25%', left: '5%', color: 'var(--success-color)', fontSize: '24px' }}>✨</div>
          <div style={{ position: 'absolute', bottom: '30%', right: '10%', color: 'var(--accent-color)', fontSize: '20px' }}>✨</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
