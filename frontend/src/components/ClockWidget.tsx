import React, { useState, useEffect } from 'react';

interface Props { id: string; onRemove: () => void; }

const ClockWidget: React.FC<Props> = ({ onRemove }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: 8, borderRadius: 8 }}>
      <h3>Clock</h3>
      <h2>{time}</h2>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default ClockWidget;