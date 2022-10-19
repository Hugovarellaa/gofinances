import { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData { }

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)