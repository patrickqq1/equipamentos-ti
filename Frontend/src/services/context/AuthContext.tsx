import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";

interface AuthProviderTypes {
  user: string | null;
  role: boolean | null;
  login: (username: string, password: string) => Promise<unknown>;
  logout: () => void;
  isAuth: () => boolean;
}

export const AuthProvider = createContext<AuthProviderTypes | undefined>(
  undefined
);

export const AuthContext: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const toast = useToast()
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<boolean | null>(null);
  useEffect(() => {
    const token = Cookies.get("token")
    if(token){
      const decoded: any = jwtDecode(token)
      setUser(decoded.name)
      setRole((decoded.isAdmin ? true : false))
      api.defaults.headers.authorization = `Bearer ${token}`
    } else {
      setUser(null)
      setRole(false)
      api.defaults.headers.authorization = null
    }
  }, [])
  const login = async (username: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post("/api/login", {
          username,
          password,
        });
        const token = response.data.token;
        Cookies.set("token", token);
        const decoded: any = jwtDecode(token);
        setUser(decoded.name);
        setRole((decoded.isAdmin ? true : false));
        api.defaults.headers.authorization = `Bearer ${token}`;
        toast({
          position: "bottom-right",
          title: `Seja Bem-vindo ${decoded.name}!`,
          status: "success",
          duration: 3000
        })
        resolve("Logado!")
      } catch (error: any) {
        reject(error.response.data.message)
      }
    })
    
  };
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setRole(null);
    api.defaults.headers.authorization = null;
  };

  const isAuth = () => {
    return Cookies.get("token") ? true : false;
  };

  return (
    <AuthProvider.Provider
      value={{
        user,
        role,
        login,
        logout,
        isAuth,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthProvider);
    if (!context){
        throw new Error('useAuth must be used within an AuthProvider');
        }
        return context;
}