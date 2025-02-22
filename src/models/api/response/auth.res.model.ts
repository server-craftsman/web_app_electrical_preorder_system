export interface socialLoginCallbackResponse {
  accessToken: string;
}

export interface userInfo {
  sub: string;
  iss: string;
  role: string;
  provider: string;
  fullName: string;
  email?: string 
  iat: number;
  exp: number;
  jti: string;
}

