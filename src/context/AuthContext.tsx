import React, { createContext, useCallback, useState } from 'react'
import api from '../services/api'

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  signIn(credentials: SignInCredentials): Promise<void>
}

interface AuthState {
  token: string
  user: object
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

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}