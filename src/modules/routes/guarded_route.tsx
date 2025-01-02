import { Navigate, useLoaderData } from 'react-router'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  redirectPath: string
  children: ReactNode
}

export const ProtectedRoute = ({ children, redirectPath }: ProtectedRouteProps): ReactNode => {
  const data = useLoaderData()
  return data ? children : <Navigate to={{ pathname: redirectPath }} replace />
}
