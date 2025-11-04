export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface Dog {
  id: number;
  name: string;
  breed: string;
  age?: number;
  isActive?: boolean;
}

export interface CreateDogDto {
  name: string;
  breed: string;
  age?: number;
  isActive?: boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

