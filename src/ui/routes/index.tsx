import React, { Suspense, useEffect } from 'react'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks'
import lazyViews from './lazy_views'

export const HOME_PATH = '/'
export const ROOM_PATH = '/room'

const AppRoutes = (): React.JSX.Element => {
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
    isAuthenticated ? navigate(ROOM_PATH) : navigate(HOME_PATH)
    return () => {}
  }, [isAuthenticated, loading])

  return (
    <Routes>
      <Route
        path={ROOM_PATH}
        element={
          <Suspense fallback={<h1>...</h1>}>
            {loading ? <lazyViews.loading /> : <lazyViews.room />}
          </Suspense>
        }
      />
      <Route path={ROOM_PATH + '/*'} element={<Navigate to={ROOM_PATH} />} />
      <Route
        path={HOME_PATH}
        element={
          <Suspense fallback={<h1>...</h1>}>
            {loading ? <lazyViews.loading /> : <lazyViews.home />}
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={HOME_PATH} />} />
    </Routes>
  )
}
export default AppRoutes
