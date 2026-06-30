import { useSelector } from 'react-redux';
import axios from 'axios';
import { Edit2, Trash2, CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

const TaskItem = ({ task, onEdit, onUpdate }) => {
  const { user } = useSelector((state) => state.auth);

  const toggleComplete = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_URL}/tasks/${task._id}`, {
        completed: !task.completed
      }, config);
      onUpdate();
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${API_URL}/tasks/${task._id}`, config);
      onUpdate();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'var(--danger-color)';
      case 'Medium': return 'var(--accent-color)';
      case 'Low': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="task-item" style={{ 
      display: 'flex', alignItems: 'flex-start', gap: '0.75rem', 
      padding: '0.75rem 0',
      borderBottom: '1px solid var(--border-color)',
      opacity: task.completed ? 0.6 : 1,
      transition: 'all 0.2s ease',
      position: 'relative'
    }}>
      <button 
        onClick={toggleComplete} 
        style={{ 
          color: task.completed ? 'var(--success-color)' : 'var(--text-secondary)',
          marginTop: '2px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ 
          fontSize: '0.875rem', 
          fontWeight: '500', 
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
          margin: 0,
          lineHeight: '1.4'
        }}>
          {task.title}
        </h3>
        
        {task.description && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '0.25rem 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {task.description}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', fontSize: '0.75rem', alignItems: 'center' }}>
          {task.dueDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--danger-color)' }}>
              <Clock size={12} /> {formatDate(task.dueDate)}
            </span>
          )}
          {task.priority && (
            <span style={{ color: getPriorityColor(task.priority), display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
               <AlertCircle size={12} /> {task.priority}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions" style={{ display: 'flex', gap: '0.25rem', opacity: 0 }}>
        <button onClick={onEdit} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'var(--text-secondary)' }}>
          <Edit2 size={16} />
        </button>
        <button onClick={handleDelete} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'var(--text-secondary)' }}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
