export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: string; // Por exemplo: "admin", "vendedor", etc.
  token?: string; // Para armazenar o token JWT
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
