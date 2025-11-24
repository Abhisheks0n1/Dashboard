// frontend/src/pages/Dashboard.tsx
import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useDashboardStore } from '../store/useDashboardStore';
import ClockWidget from '../components/ClockWidget';
import NotesWidget from '../components/NotesWidget';
import TodoWidget from '../components/TodoWidget';
import WeatherWidget from '../components/WeatherWidget';

const Dashboard: React.FC = () => {
  const { logout } = useAuthStore();
  const { widgets, addWidget, removeWidget, updateWidget, save } = useDashboardStore();

  const renderWidget = (w: any) => {
    const commonProps = { key: w.id, id: w.id, onRemove: () => removeWidget(w.id) };

    switch (w.type) {
      case 'clock':    return <ClockWidget    {...commonProps} />;
      case 'notes':    return <NotesWidget    {...commonProps} data={w.data} onUpdate={updateWidget} />;
      case 'todo':     return <TodoWidget     {...commonProps} data={w.data} onUpdate={updateWidget} />;
      case 'weather':  return <WeatherWidget  {...commonProps} />;
      default: return null;
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 42, fontWeight: 700, color: 'black', textShadow: '0 4px 10px rgba(7, 0, 0, 0.3)' }}>
          Dashboard
        </h1>
        <button onClick={logout} className="btn-primary btn-danger">
          Logout
        </button>
      </div>

      <div className="glass-card" style={{ marginBottom: 30, textAlign: 'center' }}>
        <h2 style={{ marginBottom: 20, color: '#060101ff' }}>Add New Widget</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => addWidget('clock')}   className="btn-primary">Clock</button>
          <button onClick={() => addWidget('notes')}   className="btn-primary">Notes</button>
          <button onClick={() => addWidget('todo')}    className="btn-primary">Todo</button>
          <button onClick={() => addWidget('weather')} className="btn-primary" style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
            Weather (Uttar Pradesh)
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'right', marginBottom: 30 }}>
        <button onClick={save} className="btn-primary btn-success" style={{ fontSize: 18, padding: '14px 32px' }}>
          Save Dashboard
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 24,
      }}>
        {widgets.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60 }}>
            <h3 style={{ color: '#0c0101ff', fontSize: 28 }}>No widgets yet</h3>
            <p style={{ color: '#0f0101ff', fontSize: 18 }}>Click above to add your first widget!</p>
          </div>
        ) : (
          widgets.map(renderWidget)
        )}
      </div>
    </div>
  );
};

export default Dashboard;