export interface UserModel {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}