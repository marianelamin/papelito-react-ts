import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../core/user/context/AuthContext'
import { ProgressSpinner } from 'primereact/progressspinner'

interface ProtectedRouteProps {
  redirectPath: string
}

export const ProtectedRoute = ({ redirectPath }: ProtectedRouteProps): ReactNode => {
  const { isAuthenticating, isAuthenticated } = useAuth()
  if (isAuthenticated === undefined || isAuthenticating) {
    return <ProgressSpinner />
  } else if (isAuthenticated) {
    return <Outlet />
  } else {
    return <Navigate to={{ pathname: redirectPath }} replace />
  }
}
