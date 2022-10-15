import { createContext, ReactNode, useContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string
}

interface AuthContextData {
  user: User;
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const user:User = {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@gmail.com',
  }
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
