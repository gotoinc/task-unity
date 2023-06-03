export interface JwtPayload {
  username: string;
  email: string;
  uniqueId: string;
  iat?: number;
  exp?: number;
}
