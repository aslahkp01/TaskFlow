import { useSelector, useDispatch } from 'react-redux';
import { Search, Inbox, Plus, Bell, PanelLeft, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Sidebar = ({ isMobile, isSidebarVisible, toggleSidebar, onAddTask, searchQuery, setSearchQuery }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!isMobile && !isSidebarVisible) {
    return null; // Or render a collapsed version
  }

  return (
    <div className={`sidebar ${isMobile && isSidebarVisible ? 'mobile-open' : ''}`} style={{
      width: '280px',
      height: '100dvh', // Use dynamic viewport height for mobile
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      position: isMobile ? 'fixed' : 'sticky',
      top: 0,
      left: isMobile ? (isSidebarVisible ? '0' : '-100%') : '0',
      zIndex: 100,
      transition: 'left 0.3s ease',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div 
          onClick={() => navigate('/settings')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' }} 
          className="sidebar-hover"
        >
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.875rem', overflow: 'hidden' }}>
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user?.name?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <span style={{ fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{user?.name || 'User'}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <Bell size={18} style={{ cursor: 'pointer' }} />
          <PanelLeft size={18} style={{ cursor: 'pointer' }} onClick={() => toggleSidebar(!isSidebarVisible)} />
        </div>
      </div>

      {/* Add Task Button */}
      <button onClick={onAddTask} style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem',
        border: 'none', background: 'transparent', color: 'var(--accent-color)',
        fontWeight: '500', fontSize: '0.875rem', cursor: 'pointer', marginBottom: '1rem',
        borderRadius: '8px', transition: 'background 0.2s'
      }} className="sidebar-hover">
        <div style={{ background: 'var(--accent-color)', borderRadius: '50%', padding: '2px' }}>
          <Plus size={16} color="white" />
        </div>
        Add task
      </button>

      {/* Nav Items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '2rem' }}>
        <div className="sidebar-item" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.5rem 0.75rem', borderRadius: '8px',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
              <Search size={18} color="var(--text-secondary)" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)' }}
              />
            </div>
        </div>

        <div 
          onClick={() => navigate('/dashboard')}
          className={`sidebar-item ${window.location.pathname === '/dashboard' ? 'active' : ''}`} 
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.5rem 0.75rem', borderRadius: '8px', cursor: 'pointer',
            background: window.location.pathname === '/dashboard' ? 'var(--bg-primary)' : 'transparent',
            color: window.location.pathname === '/dashboard' ? 'var(--accent-color)' : 'var(--text-primary)',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Inbox size={18} color={window.location.pathname === '/dashboard' ? 'var(--accent-color)' : 'var(--text-secondary)'} />
              <span>Inbox</span>
            </div>
        </div>
      </nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
         <button 
           onClick={() => navigate('/settings')}
           style={{ 
             display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', 
             borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-primary)',
             background: window.location.pathname === '/settings' ? 'var(--bg-primary)' : 'transparent', 
             border: 'none', width: '100%', textAlign: 'left'
           }} className="sidebar-hover">
            <SettingsIcon size={18} color={window.location.pathname === '/settings' ? 'var(--accent-color)' : 'var(--text-secondary)'} />
            <span style={{ color: window.location.pathname === '/settings' ? 'var(--accent-color)' : 'var(--text-primary)' }}>Settings</span>
          </button>
          
         <button onClick={() => {
           if (window.confirm("Are you sure you want to log out?")) {
             dispatch(logout());
             navigate('/login');
           }
         }} style={{ 
           display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', 
           borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--danger-color)',
           background: 'transparent', border: 'none', width: '100%', textAlign: 'left'
         }} className="sidebar-hover">
            <span>Log out</span>
          </button>
      </div>
    </div>
  );
};

export default Sidebar;
