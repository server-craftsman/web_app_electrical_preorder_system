import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { HttpException } from '../app/exceptions';
import {
  loginParams,
  socialLoginCallbackParams,
} from '../models/api/request/auth.req.model';
import { userInfo } from '../models/api/response/auth.res.model';
import { AuthService } from '../services/auth/auth.service';
import { storage } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '../const/router.path';
import { UserRole, HTTP_STATUS } from '../app/enums';
import { AuthContextType } from '../app/interface/auth.context.interface';
import { JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  role: UserRole;
  sub: string;
  iss: string;
  provider: string;
  fullName: string;
  iat: number;
  exp: number;
  jti: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | null>(() => {
    const storedUserInfo = storage.getUserInfo();
    return storedUserInfo?.role as UserRole | null;
  });

  const [isRoleSet, setIsRoleSet] = useState(false);

  useEffect(() => {
    if (role) {
      storage.setUserInfo({ ...storage.getUserInfo(), role: role });
    } else {
      storage.clearUserData();
    }
    setIsRoleSet(true);
  }, [role]);

  useEffect(() => {
    if (isRoleSet) {
      const params: socialLoginCallbackParams = {
        login_type: 'google',
        code: '',
      };
      socialLoginCallback(params);
    }
  }, [isRoleSet]);

  const getDefaultPath = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return ROUTER_URL.ADMIN.BASE;
      case UserRole.CUSTOMER:
        return ROUTER_URL.CUSTOMER.BASE;
      case UserRole.STAFF:
        return ROUTER_URL.STAFF.BASE;
      default:
        return ROUTER_URL.COMMON.HOME;
    }
  };

  const decodeAccessToken = (token: string) => {
    return jwtDecode<DecodedToken>(token);
  };

  const socialLoginCallback = async (params: socialLoginCallbackParams) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (!code) {
        console.warn(
          'Authorization code not found in URL. Please try logging in again.'
        );
        return;
      }
      params.code = code;

      const response = await AuthService.socialLoginCallback(params);

      if (response.status !== HTTP_STATUS.OK || !response.data) {
        throw new HttpException(
          `Unexpected response structure or status: ${response.status}`,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }

      const accessToken = response.data?.accessToken;
      if (accessToken) {
        storage.setToken(accessToken);
        const userInfo = decodeAccessToken(accessToken);
        if (userInfo) {
          storage.setUserInfo(userInfo as userInfo);
          setRole(userInfo.role as UserRole);
          navigate(getDefaultPath(userInfo.role as UserRole));
        }
      } else {
        throw new HttpException(
          'Access token not found in response',
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      throw new HttpException(
        'Social login callback failed',
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  };

  const login = async (params: loginParams) => {
    try {
      params.googleAccountId = '';
      params.fullName = '';

      const response = await AuthService.login(params);
      if (response.status !== HTTP_STATUS.OK || !response.data) {
        throw new HttpException(
          `Unexpected response structure or status: ${response.status}`,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }
      const accessToken = response.data?.accessToken;
      if (accessToken) {
        storage.setToken(accessToken);
        const userInfo = decodeAccessToken(accessToken);
        storage.setUserInfo(userInfo as userInfo);
        setRole(userInfo.role as UserRole);
        navigate(getDefaultPath(userInfo.role as UserRole));
      }
    } catch (error) {
      throw new HttpException(
        'Login failed',
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  };

  const logout = () => {
    storage.clearUserData(); // Gọi hàm clearUserData thay vì clearLocalStorage
    setIsRoleSet(false);
    setRole(null);
    navigate(ROUTER_URL.COMMON.HOME);
  };

  const getCurrentUser = () => {
    return storage.getUserInfo();
  };

  const verifyToken = async (params: { token: string }) => {
    try {
      // Xóa `params` thừa khi gọi hàm
      const response = await AuthService.verifyToken(params);

      if (response.status !== HTTP_STATUS.OK || !response.data) {
        throw new HttpException(
          `Unexpected response structure or status: ${response.status}`,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Verify token failed',
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        decodeAccessToken,
        socialLoginCallback,
        login,
        logout,
        getCurrentUser,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new HttpException(
      'useAuth must be used within an AuthProvider',
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
  return context;
};
