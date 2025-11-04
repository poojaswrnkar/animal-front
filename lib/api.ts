import { LoginDto, CreateUserDto, CreateDogDto, AuthResponse, Dog } from './types';
import { API_URL } from './config';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export const api = {
  // Authentication
  async register(data: CreateUserDto): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/authentication/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async login(data: LoginDto): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/authentication/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // Dogs
  async getDogs(): Promise<Dog[]> {
    const res = await fetch(`${API_URL}/dogs`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async getDog(id: number): Promise<Dog> {
    const res = await fetch(`${API_URL}/dogs/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async createDog(data: CreateDogDto): Promise<Dog> {
    const res = await fetch(`${API_URL}/dogs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async updateDog(id: number, data: Partial<CreateDogDto>): Promise<Dog> {
    const res = await fetch(`${API_URL}/dogs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async deleteDog(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/dogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
  },

  // Cats
  async getCats(): Promise<string> {
    const res = await fetch(`${API_URL}/cats`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.text();
  },
};

