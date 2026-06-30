import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resendOtp } from '../store/authSlice';
import Logo from '../components/Logo';
import '../index.css';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
    if (user) {
      navigate('/onboarding');
    }
  }, [email, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setMessage("Please enter a 6-digit code");
      return;
    }
    setMessage('');
    
    const res = await dispatch(verifyOtp({ email, otp }));
    if (!res.error) {
      navigate('/onboarding');
    }
  };

  const handleResend = async () => {
    setMessage('');
    const res = await dispatch(resendOtp({ email }));
    if (!res.error) {
      setMessage("A new verification code has been sent to your email.");
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: 'var(--bg-primary)' }}>
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
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Check your email
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.5' }}>
            We sent a 6-digit verification code to <strong>{email}</strong>. 
            Please enter it below to verify your account.
          </p>
          
          {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}
          {message && <div style={{ color: 'var(--success-color)', marginBottom: '1rem', background: 'rgba(54, 179, 126, 0.1)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem', textAlign: 'center' }}>{message}</div>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="input-group">
              <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' }}>Verification Code</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                required
                maxLength={6}
                style={{ background: 'transparent', letterSpacing: '0.5rem', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold' }}
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading || otp.length !== 6} style={{ 
              marginTop: '0.5rem', 
              fontWeight: 'bold', 
              padding: '0.75rem', 
              fontSize: '1rem',
              width: '100%'
            }}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
          
          <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Didn't receive the code?{' '}
            <button 
              onClick={handleResend}
              disabled={loading}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', fontWeight: '500', padding: 0 }}
            >
              Resend code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
