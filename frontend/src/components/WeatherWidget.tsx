import React, { useState, useEffect } from 'react';

interface Props {
  id: string;
  onRemove: () => void;
}

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

const WeatherWidget: React.FC<Props> = ({ onRemove }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://wttr.in/Lucknow?format=j1')
      .then(res => res.json())
      .then(data => {
        const current = data.current_condition[0];
        const temp = current.temp_C;
        const desc = current.weatherDesc[0].value;

        setWeather({
          city: 'Lucknow, Uttar Pradesh',
          temp: parseInt(temp),
          condition: desc,
          icon: desc.toLowerCase().includes('rain') ? 'Rain'
               : desc.toLowerCase().includes('sun') || desc.toLowerCase().includes('clear') ? 'Sunny'
               : desc.toLowerCase().includes('cloud') ? 'Cloud'
               : 'Cloud'
        });
      })
      .catch(() => {
        setWeather({
          city: 'Lucknow, Uttar Pradesh',
          temp: 28,
          condition: 'Partly Cloudy',
          icon: 'Cloud'
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: 16,
        padding: 24,
        margin: 12,
        background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
        color: '#333',
        minWidth: 300,
        textAlign: 'center'
      }}>
        <p>Loading weather...</p>
      </div>
    );
  }

  return (
    <div style={{
      border: 'none',
      borderRadius: 20,
      padding: 24,
      margin: 12,
      background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
      color: 'white',
      minWidth: 300,
      boxShadow: '0 8px 25px rgba(116, 185, 255, 0.4)',
      position: 'relative'
    }}>
      <button
        onClick={onRemove}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'rgba(255,255,255,0.3)',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          cursor: 'pointer',
          fontSize: 20,
          backdropFilter: 'blur(10px)'
        }}
      >
        ×
      </button>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: 20, opacity: 0.9 }}>
          Uttar Pradesh, India
        </h3>
        <div style={{ fontSize: 72, fontWeight: 'bold', margin: '10px 0' }}>
          {weather?.temp}°C
        </div>
        <div style={{ fontSize: 28, margin: '8px 0' }}>
          {weather?.icon} {weather?.condition}
        </div>
        <div style={{ marginTop: 12, opacity: 0.9, fontSize: 18 }}>
          {weather?.city}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;