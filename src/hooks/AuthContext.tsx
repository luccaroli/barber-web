import React, { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api'

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Barber:token')
    const user = localStorage.getItem('@Barber:user')
    
    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email, 
      password,
    })
    
    const { token, user } = response.data

    localStorage.setItem('@Barber:token', token)
    localStorage.setItem('@Barber:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Barber:token')
    localStorage.removeItem('@Barber:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}