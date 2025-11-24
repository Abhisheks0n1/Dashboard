import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const API = 'http://localhost:5000';

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  login: async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    set({ token: res.data.token });
  },
  register: async (email, password) => {
    const res = await axios.post(`${API}/auth/register`, { email, password });
    localStorage.setItem('token', res.data.token);
    set({ token: res.data.token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null });
  },
}));