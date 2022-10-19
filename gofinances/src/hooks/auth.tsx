import * as AuthSession from 'expo-auth-session';
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthProviderProps {
  children: ReactNode
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  }
  type: string
}

interface User {
  id: string;
  name: string
  email: string;
  photo?: string
}

interface AuthContextData {
  signInWithGoogle: () => Promise<void>
}



const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)


  async function signInWithGoogle() {
    try {
      const { CLIENT_ID } = process.env
      const { REDIRECT_URI } = process.env
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email') // encodeURI retira o espaço para ser reconhecido pela url

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse
      // console.log(response)

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        setUser({
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture
        })
        console.log({ user })
      }

    } catch (error) {
      throw new Error(error)
    }
  }


  return (
    <AuthContext.Provider value={{ signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)