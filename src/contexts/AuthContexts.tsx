import { createContext, useContext, ReactNode, useState } from 'react';
import { HTTP_STATUS } from '../app/enums';
import { HttpException } from '../app/exceptions';
import { UserRole } from '../models/modules/User';
import { queryParams, socialLoginCallbackParams } from '../models/api/request/auth.req.model';
import { AuthService } from '../services/auth/auth.service';
import { storage } from '../utils';

interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  socialLogin: (params: queryParams) => void;
  socialLoginCallback: (params: socialLoginCallbackParams) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [role, setRole] = useState<UserRole | null>(() => {
    const storedRole = storage.getUserInfoByAccessToken('role', 'token');
    return storedRole as UserRole | null;
  });

  const socialLogin = async (params: queryParams) => {
    try {
      const response = await AuthService.socialLogin(params);
      const token = response.data?.token as string;
      storage.setToken(token); // Assuming you have a method to store token
      const userInfo = await fetchUserInfo(token);
      setRole(userInfo?.role || null);
    } catch (error) {
      console.error('Social login failed', error);
    }
  };

  const fetchUserInfo = async (token: string) => {
    // TODO: Implement user info fetch
    return { role: UserRole.CUSTOMER, token: token };
  };

  const socialLoginCallback = async (params: socialLoginCallbackParams) => {
    AuthService.socialLoginCallback(params);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        socialLogin,
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
