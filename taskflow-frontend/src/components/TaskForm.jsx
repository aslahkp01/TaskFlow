import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';

const TaskForm = ({ task, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || 'Medium');
      if (task.dueDate) {
        setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
      }
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      const taskData = { title, description, priority, dueDate: dueDate || undefined };

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      if (task) {
        await axios.put(`${API_URL}/tasks/${task._id}`, taskData, config);
      } else {
        await axios.post(`${API_URL}/tasks`, taskData, config);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      border: '1px solid var(--border-color)', 
      borderRadius: '8px', 
      padding: '0.75rem',
      backgroundColor: 'var(--bg-primary)',
      marginBottom: '1rem',
      boxShadow: 'var(--shadow-md)'
    }}>
      {error && <div style={{ color: 'var(--danger-color)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input 
          type="text" 
          placeholder="Task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ 
            border: 'none', background: 'transparent', outline: 'none', 
            fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)',
            marginBottom: '0.5rem', width: '100%' 
          }}
          autoFocus
        />
        
        <input 
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ 
            border: 'none', background: 'transparent', outline: 'none', 
            fontSize: '0.875rem', color: 'var(--text-secondary)',
            marginBottom: '1rem', width: '100%' 
          }}
        />
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <label htmlFor="dueDate" style={{ cursor: 'pointer' }}>Due date</label>
            <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.75rem', color: 'var(--text-secondary)', padding: 0 }} />
          </div>
          
          <div style={{ position: 'relative' }}>
            <button 
              type="button"
              onClick={() => setIsPriorityOpen(!isPriorityOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'transparent', cursor: 'pointer' }}
            >
              Priority: {priority}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {isPriorityOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, marginTop: '0.25rem',
                width: '120px', background: 'var(--card-bg)', border: '1px solid var(--border-color)',
                borderRadius: '8px', padding: '0.25rem', boxShadow: 'var(--shadow-md)', zIndex: 100
              }}>
                {['High', 'Medium', 'Low'].map(opt => (
                  <div 
                    key={opt}
                    onClick={() => { setPriority(opt); setIsPriorityOpen(false); }}
                    style={{
                      cursor: 'pointer', padding: '0.5rem', borderRadius: '4px',
                      background: priority === opt ? 'var(--accent-color)' : 'transparent',
                      color: priority === opt ? 'white' : 'var(--text-primary)',
                      fontSize: '0.75rem',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => { if (priority !== opt) e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                    onMouseOut={(e) => { if (priority !== opt) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
          <button type="button" onClick={onClose} style={{ background: 'var(--bg-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', color: 'var(--text-primary)', fontWeight: '500', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" disabled={loading || !title.trim()} style={{ background: title.trim() ? 'var(--accent-color)' : 'var(--bg-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', color: title.trim() ? 'white' : 'var(--text-secondary)', fontWeight: '500', cursor: title.trim() ? 'pointer' : 'not-allowed' }}>
            {task ? 'Save' : 'Add task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
