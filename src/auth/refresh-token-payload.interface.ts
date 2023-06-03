export interface RefreshTokenPayload {
  username: string;
  email: string;
  uniqueId: string;
  iat?: number;
  exp?: number;
}
