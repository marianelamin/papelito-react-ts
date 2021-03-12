import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router'

const Home = lazy(() => import('ui/pages/home'))
const Room = lazy(() => import('ui/pages/room'))

const Routes = () => (
  <Switch>
    <Suspense fallback={<h1>Loading page ... </h1>}>
      <Route path="/room/:id" component={Room}></Route>
      <Route exact path="/" component={Home}></Route>
    </Suspense>
  </Switch>
)

export interface RoomRouteParams {
  id: string
}

export default Routes
