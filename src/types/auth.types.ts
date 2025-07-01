import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: users;
}

export interface users {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  password: string;
  profileImage?: string | null;
  isActive?: boolean;
}
