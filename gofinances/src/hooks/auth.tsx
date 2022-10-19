import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";


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
  user: User
  isLoadingStorage: boolean
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  SignOut: () => Promise<void>
}



const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [isLoadingStorage, setIsLoadingStorage] = useState(true)
  const collectionKey = '@gofinance:user'


  async function signInWithGoogle() {
    try {
      const { CLIENT_ID } = process.env
      const { REDIRECT_URI } = process.env
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email') // encodeURI retira o espaço para ser reconhecido pela url

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        setUser({
          id: String(userInfo.id),
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture
        })

        await AsyncStorage.setItem(collectionKey, JSON.stringify(userInfo))
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const name = credential.fullName!.givenName!
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo: `https://ui-avatars.com/api/?name=${name}&length=1`
        }
        setUser(userLogged)

        await AsyncStorage.setItem(collectionKey, JSON.stringify(userLogged))
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  async function SignOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(collectionKey)
  }


  useEffect(() => {

    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(collectionKey)

      if (userStorage) {
        const userLogged = await JSON.parse(userStorage) as User
        setUser(userLogged)
        setIsLoadingStorage(false)
      }
    }
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, SignOut, isLoadingStorage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)