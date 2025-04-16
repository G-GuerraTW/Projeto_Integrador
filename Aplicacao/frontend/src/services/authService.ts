import { LoginRequest, LoginResponse, User } from '../models/User';

// URL base da API
const API_URL = 'http://localhost:5193/api';

// Função para fazer login
export const login = async (credentials: LoginRequest): Promise<User> => {
  try {
    // Quando o backend estiver pronto, descomente este código:
    /*
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha na autenticação');
    }

    const data: LoginResponse = await response.json();
    
    // Salvar o token no localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data.user;
    */

    // Simulação para desenvolvimento (remova quando o backend estiver pronto)
    if (credentials.email === 'admin@exemplo.com' && credentials.senha === 'senha123') {
      const mockUser: User = {
        id: 1,
        nome: 'Administrador',
        email: credentials.email,
        perfil: 'admin',
        token: 'mock-jwt-token'
      };
      
      localStorage.setItem('token', mockUser.token || '');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return mockUser;
    } else {
      throw new Error('Email ou senha incorretos');
    }
  } catch (error) {
    throw error;
  }
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

// Função para obter o usuário atual
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Função para fazer logout
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Função para obter o token JWT
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};
