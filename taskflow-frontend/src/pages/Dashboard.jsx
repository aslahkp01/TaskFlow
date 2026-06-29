import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, MoreHorizontal, PanelLeft } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { user, theme, toggleTheme } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTasks();

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile && !sidebarOpen) {
        // Option to auto-open on desktop resize, but maybe we remember their preference
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [user, navigate, search]); // re-fetch when search changes



  const fetchTasks = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.get(`${API_URL}/tasks?search=${search}`, config);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  };



  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
    fetchTasks();
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdate = () => {
    fetchTasks();
    showNotification("Task updated");
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar 
        isMobile={isMobile}
        isSidebarVisible={sidebarOpen}
        toggleSidebar={setSidebarOpen} 
        onAddTask={() => setIsFormOpen(true)}
        searchQuery={search}
        setSearchQuery={setSearch}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, transition: 'margin-left 0.3s ease' }}>
        
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
          {!sidebarOpen && (
             <button onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', marginRight: '1rem', display: 'flex', alignItems: 'center' }}>
               <PanelLeft size={20} />
             </button>
          )}
          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Inbox</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1.25rem', display: 'flex', alignItems: 'center' }} onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        <main style={{ padding: '2rem', maxWidth: '800px', width: '100%', margin: '0 auto', flex: 1 }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Inbox</h1>
            <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><MoreHorizontal size={20} /></button>
            </div>
          </header>

          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {isFormOpen && !editingTask && (
                <TaskForm onClose={handleCloseForm} />
              )}
              {tasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', maxWidth: '400px', margin: '0 auto' }}>
                  <svg width="240" height="160" viewBox="0 0 240 160" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
                    {/* Soft background shadow/glow */}
                    <ellipse cx="120" cy="140" rx="60" ry="10" fill="rgba(134, 239, 172, 0.3)" />
                    <ellipse cx="120" cy="80" rx="80" ry="50" fill="rgba(243, 244, 246, 0.5)" />
                    
                    {/* Green Leaves */}
                    <path d="M40 120 C 30 100, 50 80, 60 90 C 70 100, 60 120, 50 130 Z" fill="#bbf7d0" />
                    <path d="M60 135 C 50 125, 70 115, 80 125 C 90 135, 70 145, 60 135 Z" fill="#86efac" />
                    <path d="M190 70 C 210 50, 220 70, 200 90 C 180 110, 170 100, 190 70 Z" fill="#86efac" />
                    <path d="M200 120 C 210 110, 220 120, 210 130 C 200 140, 190 130, 200 120 Z" fill="#bbf7d0" />
                    <path d="M165 100 C 185 70, 210 50, 195 40 C 180 30, 160 50, 155 80 Z" fill="#65a30d" opacity="0.8" />

                    {/* Stars */}
                    <path d="M170 30 L 175 40 L 185 45 L 175 50 L 170 60 L 165 50 L 155 45 L 165 40 Z" fill="#fde047" />
                    <path d="M45 75 L 48 82 L 55 85 L 48 88 L 45 95 L 42 88 L 35 85 L 42 82 Z" fill="#fef08a" />
                    <path d="M210 70 L 213 77 L 220 80 L 213 83 L 210 90 L 207 83 L 200 80 L 207 77 Z" fill="#fbbf24" />

                    {/* Yellow Box Back */}
                    <path d="M70 70 C 70 65, 75 60, 80 60 L 160 60 C 165 60, 170 65, 170 70 L 170 110 L 70 110 Z" fill="#fde047" />
                    
                    {/* Yellow Box Inside Depth */}
                    <path d="M75 65 L 165 65 L 165 100 L 75 100 Z" fill="#facc15" opacity="0.8" />

                    {/* Yellow Box Front Lip */}
                    <path d="M65 90 C 65 85, 70 80, 75 80 L 95 80 C 100 80, 105 85, 105 90 L 110 100 L 130 100 L 135 90 C 135 85, 140 80, 145 80 L 165 80 C 170 80, 175 85, 175 90 L 175 120 C 175 125, 170 130, 165 130 L 75 130 C 70 130, 65 125, 65 120 Z" fill="#fef08a" />
                  </svg>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Capture now, plan later
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    {search 
                      ? 'No tasks match your search.' 
                      : "Inbox is your go-to spot for quick task entry. Clear your mind now, organize when you're ready."
                    }
                  </p>
                  {!search && (
                    <button 
                      onClick={() => setIsFormOpen(true)}
                      className="btn"
                      style={{ 
                        background: 'var(--accent-color)', 
                        color: 'white', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      <Plus size={16} /> Add task
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ marginBottom: '1rem' }}>
                  {tasks.map(task => (
                    <div key={task._id}>
                      {editingTask?._id === task._id ? (
                        <TaskForm task={task} onClose={handleCloseForm} />
                      ) : (
                        <TaskItem task={task} onEdit={() => handleEdit(task)} onUpdate={handleUpdate} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!isFormOpen && !editingTask && tasks.length > 0 && (
                <button 
                  onClick={() => setIsFormOpen(true)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0',
                    border: 'none', background: 'transparent', color: 'var(--text-secondary)',
                    fontSize: '0.875rem', cursor: 'pointer', transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <Plus size={18} /> Add task
                </button>
              )}


            </div>
          )}
        </main>
      </div>

      {notification && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '2rem',
          background: 'var(--card-bg)', color: 'var(--text-primary)',
          padding: '0.75rem 1rem', borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1000,
          animation: 'slideUp 0.3s ease-out'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{notification}</span>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-color)', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }}>Undo</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
