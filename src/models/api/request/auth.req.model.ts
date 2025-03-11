export interface queryParams {
  login_type: string;
}

export interface socialLoginCallbackParams {
  login_type: string;
  code: string;
}

export interface loginParams {
  username: string;
  password: string;
}
