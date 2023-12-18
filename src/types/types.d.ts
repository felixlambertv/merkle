import { Role } from "./../enum/Role";

export interface UserPayload {
  userId: number;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload | null;
    }
  }
}
