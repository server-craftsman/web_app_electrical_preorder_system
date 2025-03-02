import { UserRole } from '../enums/user.enum';
import { socialLoginCallbackParams } from '../../models/api/request/auth.req.model';
import { loginParams } from '../../models/api/request/auth.req.model';
import { userInfo } from '../../models/api/response/auth.res.model';
import { formatResponseSuccess } from './response_success.interface';

export interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  decodeAccessToken: (token: string) => any;
  socialLoginCallback: (params: socialLoginCallbackParams) => void;
  login: (params: loginParams) => void;
  logout: () => void;
  getCurrentUser: () => userInfo | null;
  verifyToken: (params: {
    token: string;
  }) => Promise<formatResponseSuccess<string>>;
}
