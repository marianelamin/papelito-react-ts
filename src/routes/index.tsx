import { Suspense, useEffect, useState } from 'react'

// import { Route } from 'react-router'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import ProtectedRoute, { ProtectedRouteProps } from './guarded-route'
import { useIsAuthenticated } from '../hooks'
import lazyViews from './lazy_views'

const HOME_PATH = '/'
const ROOM_PATH = '/room'

const AppRoutes = () => {
  const { isAuthenticated } = useIsAuthenticated()
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
    console.log('verifyinggg... \n\n\n\n', isAuthenticated, '\n\n')
    !isAuthenticated ? navigate(HOME_PATH) : navigate(ROOM_PATH)
    return () => {}
  }, [isAuthenticated])

  return (
    <Routes>
      {/* <Route
        path={ROOM_PATH}
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={
              <Suspense fallback={<h1>...</h1>}>
                <lazyViews.room />
              </Suspense>
            }
          />
        }
      ></Route> */}
      <Route
        path={ROOM_PATH}
        element={
          <Suspense fallback={<h1>...</h1>}>
            <lazyViews.room />
          </Suspense>
        }
      ></Route>

      <Route path={ROOM_PATH + '/*'} element={<Navigate to={ROOM_PATH} />} />

      <Route
        path={HOME_PATH}
        element={
          <Suspense fallback={<h1>...</h1>}>
            <lazyViews.home />
          </Suspense>
        }
      ></Route>
      <Route path="*" element={<Navigate to={HOME_PATH} />} />
    </Routes>
  )
}
export default AppRoutes
