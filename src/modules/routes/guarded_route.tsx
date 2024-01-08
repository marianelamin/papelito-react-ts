import { Navigate, useNavigate } from 'react-router'
import { useAuth } from '../../hooks'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  isAuthd: boolean
  authenticationPath: string
  outlet: JSX.Element
}

export const ProtectedRoute = ({
  isAuthd, // is authenticated
  authenticationPath,
  outlet
}: ProtectedRouteProps) => {
  console.log('path:', authenticationPath, '\nis-auth?', isAuthd)

  if (isAuthd) {
    return outlet
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />
  }
}

const MakingUseOfProtected = () => {
  const { isAuthenticated, loading } = useAuth()
  /** @todo: figure out why this approach is not working, leave open fo now and handle redirecting on room view instead */
  // const [defaultProtectedRouteProps, setDefaultProtectedRouteProps] = useState<
  //   Omit<ProtectedRouteProps, 'outlet'>
  // >({
  //   isAuthenticated: isAuthenticated,
  //   authenticationPath: HOME_PATH,
  // })

  const navigate = useNavigate()
  /** Terribe hack so goes back to room in case user is authenticated */
  useEffect(() => {
    console.log('loading: ', loading)
    console.log('verifyinggg... isAuthenticated: ', isAuthenticated, '\n\n')
    isAuthenticated ? navigate('/room') : navigate('/home')
    return () => {}
  }, [isAuthenticated, loading])
}
