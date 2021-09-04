export type SignInRequestBody = {
  fullname: string;
  email: string;
  password: string;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type RefreshTokenBody = {
  refresh_token: string;
};

export interface RefreshTokenAttributes {
  id?: number;
  token: string;
  expiryDate: Date | number;
  userId?: number;
}
export interface UserAttributes {
  id?: number;
  fullname: string;
  email: string;
  password: string;
}
