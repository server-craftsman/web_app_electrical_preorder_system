import { createContext, useContext, ReactNode, useState } from 'react';
import { HTTP_STATUS } from '../app/enums';
import { HttpException } from '../app/exceptions';
import { UserRole } from '../models/modules/User';

interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(() => {
    const storedRole = localStorage.getItem('role');
    return storedRole as UserRole | null;
  });

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
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
