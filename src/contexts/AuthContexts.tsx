import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { HTTP_STATUS } from '../app/enums';
import { HttpException } from '../app/exceptions';
import { socialLoginCallbackParams } from '../models/api/request/auth.req.model';
import { userInfo } from '../models/api/response/auth.res.model';
import { AuthService } from '../services/auth/auth.service';
import { storage } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '../const/router.path';
import { UserRole } from '../app/enums';

interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  decodeAccessToken: (token: string) => any;
  socialLoginCallback: (params: socialLoginCallbackParams) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Function to decode JWT token and extract payload

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
      storage.clearLocalStorage();
    }
    setIsRoleSet(true);
  }, [role]);

  useEffect(() => {
    if (isRoleSet) {
      const params: socialLoginCallbackParams = { login_type: 'google', code: '' };
      socialLoginCallback(params);
    }
  }, [isRoleSet]);

  const decodeAccessToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode access token', error);
      return null;
    }
  };

  const socialLoginCallback = async (params: socialLoginCallbackParams) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (!code) {
        console.warn('Authorization code not found in URL. Please try logging in again.');
        return;
      }
      params.code = code;

      const response = await AuthService.socialLoginCallback(params);

      if (response.status !== 200 || !response.data) {
        throw new Error(`Unexpected response structure or status: ${response.status}`);
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
        throw new Error('Access token not found in response');
      }
    } catch (error) {
      console.error('Social login callback failed', error);
    }
  };

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

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        decodeAccessToken,
        socialLoginCallback,
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
