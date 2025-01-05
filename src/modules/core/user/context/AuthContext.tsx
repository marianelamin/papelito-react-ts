import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { isUserValidInRoom } from '../../../../services/user.service'
import { PapelitoLocalStorage } from '../../../../local-storage'

interface AuthState {
  isAuthenticating: boolean
  isAuthenticated?: boolean
  login: (success: boolean) => void
  logout: () => void
}

export const AuthContext = createContext<AuthState | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export function AuthContextProvider({ children }: { children: ReactNode }): ReactNode {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false)

  useEffect(() => {
    const verifyUserIsAuthenticated = async () => {
      const success = await attemptToGetPlayerAndRoomDetails()
      login(!!success)
      setIsAuthenticating((_) => false)
      if (!success) {
        PapelitoLocalStorage.clear()
      }
    }

    setIsAuthenticating(true)
    verifyUserIsAuthenticated()
  }, [])

  const login = (success: boolean) => {
    setIsAuthenticated(success)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticating, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext)
  if (context == null) {
    throw new Error('useAuth debe ser usado dentro de AuthContextProvider')
  }

  return context
}

export const attemptToGetPlayerAndRoomDetails = async () => {
  const { roomId, myUserId } = PapelitoLocalStorage.getRoomAndPlayerId()

  if (roomId && myUserId) {
    try {
      // john is super cool
      // todo: fix the data being stored in redux store. after reload and verify user
      const player = await isUserValidInRoom(roomId, myUserId)
      return player
    } catch (err) {
      console.error(err)
    }
  } else {
    console.log({ roomId, myUserId })
  }
  return undefined
}
