import { UserRole } from '../enums/user.role';
import { socialLoginCallbackParams } from '../../models/api/request/auth.req.model';
import { loginParams } from '../../models/api/request/auth.req.model';
import { userInfo } from '../../models/api/response/auth.res.model';

export interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  decodeAccessToken: (token: string) => any;
  socialLoginCallback: (params: socialLoginCallbackParams) => void;
  login: (params: loginParams) => void;
  logout: () => void;
  getCurrentUser: () => userInfo | null;
}