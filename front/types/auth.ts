export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: User | null;
  message: string;
  status: string;
}

export interface User {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  licenseNumber: string | null;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  licenseNumber?: string;
}
