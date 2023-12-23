import { Navigate } from 'react-router-dom'

export interface ProtectedRouteProps {
  isAuthenticated: boolean
  authenticationPath: string
  outlet: JSX.Element
}

export const ProtectedRoute = ({
  isAuthenticated,
  authenticationPath,
  outlet
}: ProtectedRouteProps) => {
  console.log('path:', authenticationPath, '\nis-auth?', isAuthenticated)

  if (isAuthenticated) {
    return outlet
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />
  }
}

export default ProtectedRoute
