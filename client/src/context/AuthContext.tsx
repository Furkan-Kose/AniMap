import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  username: string;
  role: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginFunc: (userData: any) => Promise<void>;
  logoutFunc: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/me", { withCredentials: true });
        setUser(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const loginFunc = async (userData: any) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", userData, {withCredentials: true});
      setUser(response.data.user);
      console.log("response data user" + response.data.user);
      return response.data.user;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logoutFunc = async () => {
    try {
      await axios.post(
        "http://localhost:3000/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginFunc, logoutFunc }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
