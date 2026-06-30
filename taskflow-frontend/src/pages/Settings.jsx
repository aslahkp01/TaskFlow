import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, toggleTheme } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Sun, Moon, Download, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const dispatch = useDispatch();
  const { user, theme, loading: authLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [name, setName] = useState(user?.name || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ text: 'Image must be smaller than 2MB', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const res = await dispatch(updateProfile({ name, profilePhoto }));
    if (!res.error) {
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    } else {
      setMessage({ text: res.payload || 'Update failed', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar 
        isMobile={isMobile}
        isSidebarVisible={sidebarOpen}
        toggleSidebar={setSidebarOpen} 
        onAddTask={() => navigate('/dashboard')}
        searchQuery=""
        setSearchQuery={() => {}}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Header */}
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
          {isMobile && (
             <button onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', marginRight: '1rem', display: 'flex', alignItems: 'center' }}>
               ☰
             </button>
          )}
          <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <ArrowLeft size={20} /> Back to Dashboard
          </button>
        </div>

        <main style={{ padding: '2rem', maxWidth: '800px', width: '100%', margin: '0 auto', flex: 1 }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '2rem' }}>Settings</h1>

          {message.text && (
            <div style={{ 
              padding: '1rem', marginBottom: '2rem', borderRadius: '8px', 
              backgroundColor: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
              color: message.type === 'error' ? 'var(--danger-color)' : 'var(--success-color)'
            }}>
              {message.text}
            </div>
          )}

          {/* Profile Section */}
          <section className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Profile</h2>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Avatar Upload */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                  border: '2px solid var(--border-color)'
                }}>
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '2rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                      {name.charAt(0).toUpperCase()}
                    </span>
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
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  >
                    <Upload size={16} /> Change Photo
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Input (Readonly) */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>Email</label>
                <input 
                  type="email" 
                  className="input-field" 
                  value={user?.email || ''}
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </section>

          {/* Preferences Section */}
          <section className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Preferences</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>Appearance</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Toggle between light and dark mode.</p>
              </div>
              
              <button 
                onClick={handleThemeToggle} 
                className="btn" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                {theme === 'light' ? <><Moon size={18} /> Dark Mode</> : <><Sun size={18} /> Light Mode</>}
              </button>
            </div>
          </section>

          {/* Data Management Section */}
          <section className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Data Management</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>Export Data</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Download a copy of all your tasks and account data.</p>
                </div>
                <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  <Download size={18} /> Export
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--danger-color)' }}>Delete Account</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Permanently delete your account and all data. This cannot be undone.</p>
                </div>
                <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>
                  <Trash2 size={18} /> Delete Account
                </button>
              </div>
            </div>
          </section>
          
        </main>
      </div>
    </div>
  );
};

export default Settings;
