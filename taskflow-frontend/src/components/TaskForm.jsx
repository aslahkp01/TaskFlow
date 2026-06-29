import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { X } from 'lucide-react';

const TaskForm = ({ task, onClose }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
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

      if (task) {
        await axios.put(`http://localhost:5000/api/tasks/${task._id}`, taskData, config);
      } else {
        await axios.post('http://localhost:5000/api/tasks', taskData, config);
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-secondary)' }}>
              <option value="Low">Priority 3</option>
              <option value="Medium">Priority 2</option>
              <option value="High">Priority 1</option>
            </select>
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
