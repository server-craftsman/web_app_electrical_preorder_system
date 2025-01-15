import { createContext, useContext, ReactNode } from 'react';
import { HTTP_STATUS } from '../app/enums';
import { HttpException } from '../app/exceptions';

interface AuthContextType {
  // role: UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider
      value={
        {
          // role: null,
        }
      }
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
