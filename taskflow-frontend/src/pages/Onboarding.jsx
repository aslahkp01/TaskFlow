import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/authSlice';
import { CheckCircle, ChevronRight, Check } from 'lucide-react';
import Logo from '../components/Logo';
import '../index.css';

const Onboarding = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFinish, setSelectedFinish] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.onboarded) {
      navigate('/dashboard');
    }
    if (user?.name) {
      setName(user.name);
    }
  }, [user, navigate]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleOptionClick = (idx) => {
    setSelectedOption(idx);
    setTimeout(() => {
      setSelectedOption(null);
      handleNext();
    }, 300);
  };

  const handleFinishClick = (idx) => {
    setSelectedFinish(idx);
    setTimeout(() => {
      handleFinish();
    }, 400);
  };

  const handleFinish = async () => {
    setLoading(true);
    const res = await dispatch(updateProfile({ name, onboarded: true, profilePhoto }));
    if (!res.error) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: 'var(--bg-primary)' }}>
      {/* Left Column - Content */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
            <Logo size={28} color="currentColor" />
            <span>TaskFlow</span>
          </div>
        </div>

        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          {step === 1 && (
            <div className="fade-in">
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                What's your name?
              </h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Complete your profile now.</p>
              
              <div className="input-group">
                <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' }}>Your name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ background: 'transparent' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--success-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', overflow: 'hidden' }}>
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    name.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn" 
                    style={{ background: 'var(--bg-secondary)', marginBottom: '0.25rem' }}
                  >
                    Upload photo
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pick a photo up to 2MB.</p>
                </div>
              </div>
              
              <button onClick={handleNext} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}>
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                How do you currently manage tasks?
              </h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Pick the option that you use the most.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {['I write them on paper', 'I use a different task app', 'I create events in calendar', 'I try to remember them'].map((opt, idx) => (
                  <button key={idx} onClick={() => handleOptionClick(idx)} style={{ 
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', 
                    background: selectedOption === idx ? 'var(--accent-color)' : 'transparent', 
                    border: '1px solid var(--border-color)', 
                    borderColor: selectedOption === idx ? 'var(--accent-color)' : 'var(--border-color)',
                    borderRadius: '8px', textAlign: 'left', cursor: 'pointer',
                    transform: selectedOption === idx ? 'scale(0.98) translateX(10px)' : 'scale(1) translateX(0)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }} className="onboard-option">
                    <span style={{ 
                      width: '24px', height: '24px', borderRadius: '50%', 
                      border: selectedOption === idx ? 'none' : '1px solid var(--border-color)', 
                      background: selectedOption === idx ? 'rgba(255,255,255,0.2)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: '0.75rem', 
                      color: selectedOption === idx ? 'white' : 'var(--text-secondary)',
                      transition: 'all 0.3s'
                    }}>
                      {selectedOption === idx ? <Check size={14} color="white" /> : String.fromCharCode(65 + idx)}
                    </span>
                    <span style={{ 
                      fontWeight: '500', 
                      color: selectedOption === idx ? 'white' : 'var(--text-primary)',
                      transition: 'color 0.3s'
                    }}>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                How do you plan to use TaskFlow?
              </h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Select one to get started.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={() => handleFinishClick(0)} disabled={loading} style={{ 
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', 
                  background: selectedFinish === 0 ? 'var(--accent-color)' : 'transparent', 
                  border: '1px solid var(--border-color)', 
                  borderColor: selectedFinish === 0 ? 'var(--accent-color)' : 'var(--border-color)',
                  borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
                  transform: selectedFinish === 0 ? 'scale(0.98)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }} className="onboard-option">
                  <div style={{ 
                    width: '48px', height: '48px', 
                    background: selectedFinish === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(54, 179, 126, 0.1)', 
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: selectedFinish === 0 ? 'white' : 'var(--success-color)',
                    transition: 'all 0.4s'
                  }}>
                    <CheckCircle />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem', 
                      color: selectedFinish === 0 ? 'white' : 'var(--text-primary)',
                      transition: 'color 0.4s'
                    }}>For myself</h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: selectedFinish === 0 ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)',
                      transition: 'color 0.4s'
                    }}>I want a personal space to organize my work and life.</p>
                  </div>
                </button>
                
                <button onClick={() => handleFinishClick(1)} disabled={loading} style={{ 
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', 
                  background: selectedFinish === 1 ? 'var(--accent-color)' : 'transparent', 
                  border: '1px solid var(--border-color)', 
                  borderColor: selectedFinish === 1 ? 'var(--accent-color)' : 'var(--border-color)',
                  borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
                  transform: selectedFinish === 1 ? 'scale(0.98)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }} className="onboard-option">
                  <div style={{ 
                    width: '48px', height: '48px', 
                    background: selectedFinish === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(0, 82, 204, 0.1)', 
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: selectedFinish === 1 ? 'white' : 'var(--accent-color)',
                    transition: 'all 0.4s'
                  }}>
                    <Logo size={24} color="currentColor" />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem', 
                      color: selectedFinish === 1 ? 'white' : 'var(--text-primary)',
                      transition: 'color 0.4s'
                    }}>With my team</h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: selectedFinish === 1 ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)',
                      transition: 'color 0.4s'
                    }}>I want a powerful home for my team's work.</p>
                  </div>
                </button>
              </div>
            </div>
          )}
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
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', width: '80%', zIndex: 10, transition: 'all 0.5s' }}>
            
            {step === 1 && (
              <div className="fade-in" style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--accent-color)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={40} color="var(--accent-color)" />
                </div>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>Completed in the last 7 days</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ flex: 3, background: 'var(--accent-color)' }}></div>
                    <div style={{ flex: 2, background: 'var(--success-color)' }}></div>
                    <div style={{ flex: 4, background: 'var(--border-color)' }}></div>
                  </div>
                  <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', width: '80%' }}>
                    <div style={{ flex: 2, background: 'var(--accent-color)' }}></div>
                    <div style={{ flex: 1, background: 'var(--success-color)' }}></div>
                    <div style={{ flex: 3, background: 'var(--border-color)' }}></div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} style={{ width: '16px', height: '16px', border: '2px solid var(--text-primary)', borderRadius: '50%', borderBottomColor: 'transparent', transform: 'rotate(45deg)' }}></div>
                  ))}
                </div>
                <div style={{ height: '150px', background: 'linear-gradient(135deg, rgba(54, 179, 126, 0.1) 0%, rgba(0, 82, 204, 0.1) 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Check size={80} color="var(--success-color)" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '32px', height: '32px', background: 'var(--bg-secondary)', borderRadius: '50%' }}></div>
                  <div style={{ height: '12px', width: '80px', background: 'var(--bg-secondary)', borderRadius: '6px' }}></div>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Project</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--border-color)' }}></div>
                      <div style={{ height: '8px', width: '60%', background: 'var(--bg-secondary)', borderRadius: '4px' }}></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
          {/* Sparkles */}
          <div style={{ position: 'absolute', top: '25%', left: '5%', color: '#ffbd2e', fontSize: '24px', transition: 'all 0.5s', transform: `translateY(${step * 10}px)` }}>✨</div>
          <div style={{ position: 'absolute', bottom: '30%', right: '10%', color: 'var(--accent-color)', fontSize: '20px', transition: 'all 0.5s', transform: `translateY(-${step * 10}px)` }}>✨</div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
