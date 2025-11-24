import { create } from 'zustand';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Widget {
  id: string;
  type: 'clock' | 'notes' | 'todo' | 'weather';
  position: number;
  data?: any;
}

interface DashboardState {
  widgets: Widget[];
  load: () => Promise<void>;
  save: () => Promise<void>;
  addWidget: (type: Widget['type']) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, data: any) => void;
}

const API = 'http://localhost:5000';

export const useDashboardStore = create<DashboardState>((set, get) => ({
  widgets: [],

  load: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${API}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ widgets: res.data.widgets || [] });
    } catch (err) {
      console.error('Failed to load dashboard');
    }
  },

  save: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.post(
        `${API}/dashboard`,
        { widgets: get().widgets },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Dashboard saved successfully!');
    } catch (err) {
      alert('Failed to save dashboard');
    }
  },

  addWidget: (type) => {
    const defaults: Record<Widget['type'], any> = {
      clock: undefined,
      notes: { text: '' },
      todo: { items: [] },
      weather: undefined,
    };

    const newWidget: Widget = {
      id: uuidv4(),
      type,
      position: get().widgets.length,
      data: defaults[type],
    };

    set({ widgets: [...get().widgets, newWidget] });
  },

  removeWidget: (id) => {
    set({
      widgets: get().widgets
        .filter((w) => w.id !== id)
        .map((w, idx) => ({ ...w, position: idx })),
    });
  },

  updateWidget: (id, data) => {
    set({
      widgets: get().widgets.map((w) =>
        w.id === id ? { ...w, data } : w
      ),
    });
  },
}));