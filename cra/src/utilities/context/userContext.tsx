import { PapelitoLocalStorage } from 'local-storage'
import { type ReactNode, createContext, useContext } from 'react'

interface User {
  roomId: string
  userId: string
}

export const UserContext = createContext<User | undefined>(undefined)
UserContext.displayName = 'UserContext'

// Context Provider hook

export function useUser(): User {
  const context = useContext(UserContext)
  if (context == null) {
    throw new Error('useUser debe ser usado dentro de UserContextProvider')
  }

  return context
}

// Context Provider

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider(props: UserContextProviderProps): JSX.Element {
  const { children } = props
  const roomId = PapelitoLocalStorage.getRoomId() ?? ''
  const userId = PapelitoLocalStorage.getUserId() ?? ''

  return <UserContext.Provider value={{ roomId, userId }}>{children}</UserContext.Provider>
}
