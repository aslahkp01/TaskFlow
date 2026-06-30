import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import Logo from '../components/Logo';
import '../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await dispatch(login({ email, password }));
    if (!res.error) {
      navigate('/dashboard');
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
            Welcome back!
          </h1>
          
          {/* Social Buttons (Visual Only) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            <button className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
            <button className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Continue with Facebook
            </button>
            <button className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.24-.86 3.44-.86 1.49.03 2.7.53 3.61 1.41-3.08 1.63-2.58 5.76.32 7.02-.73 1.82-1.63 3.65-2.45 4.6zm-1.89-13.6c-.63 1.25-1.88 2.08-3.15 1.95-.23-1.41.44-2.73 1.12-3.46.77-.81 2.05-1.45 3.12-1.35.12 1.41-.47 2.19-1.09 2.86z"/></svg>
              Continue with Apple
            </button>
          </div>
          
          {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <div style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Forgot your password?</a>
          </div>
          <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '500' }}>Sign up</Link>
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
          <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'rgba(0, 82, 204, 0.05)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: '200px', height: '200px', background: 'rgba(54, 179, 126, 0.05)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', width: '80%', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(0, 82, 204, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '16px', height: '16px', borderBottom: '3px solid var(--accent-color)', borderRight: '3px solid var(--accent-color)', transform: 'rotate(45deg)', marginTop: '-4px' }}></div>
              </div>
              <div style={{ height: '12px', width: '100px', background: 'var(--bg-secondary)', borderRadius: '6px' }}></div>
            </div>
            <div style={{ height: '8px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '4px', marginBottom: '1rem' }}></div>
            <div style={{ height: '8px', width: '80%', background: 'var(--bg-secondary)', borderRadius: '4px', marginBottom: '2rem' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: '32px', width: '80px', background: 'var(--accent-color)', borderRadius: '16px' }}></div>
              <div style={{ width: '32px', height: '32px', background: 'rgba(54, 179, 126, 0.1)', borderRadius: '50%' }}></div>
            </div>
          </div>
          {/* Sparkles */}
          <div style={{ position: 'absolute', top: '25%', left: '5%', color: '#ffbd2e', fontSize: '24px' }}>✨</div>
          <div style={{ position: 'absolute', bottom: '30%', right: '10%', color: 'var(--accent-color)', fontSize: '20px' }}>✨</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
