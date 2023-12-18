import { UserPayload } from "./../types/types.d";

export interface LoginResponse {
  tokens: string;
  user: UserPayload;
}
