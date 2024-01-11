import { Navigate, useLoaderData } from 'react-router'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  defaultPath: string
  children: ReactNode
}

export const ProtectedRoute = ({ children, defaultPath }: ProtectedRouteProps): ReactNode => {
  const data = useLoaderData()
  return data ? children : <Navigate to={{ pathname: defaultPath }} replace />
}
