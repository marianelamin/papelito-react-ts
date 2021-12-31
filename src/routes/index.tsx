import { Suspense } from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import lazyViews from './lazy_views'

const AppRoutes = () => (
  <Routes>
    <Route
      path="/room/:id"
      element={
        <Suspense fallback={<h1>...</h1>}>
          <lazyViews.room />
        </Suspense>
      }
    ></Route>
    <Route
      path="/"
      element={
        <Suspense fallback={<h1>...</h1>}>
          <lazyViews.home />
        </Suspense>
      }
    ></Route>
  </Routes>
)

export interface RoomRouteParams {
  id: string
}

export default AppRoutes
