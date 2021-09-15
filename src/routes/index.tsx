import { Suspense } from 'react'
import { Route, Switch } from 'react-router'
import lazyViews from './lazy_views'

const Routes = () => (
  <Switch>
    <Suspense fallback={<h1>Loading page ... </h1>}>
      <Route path="/room/:id" component={lazyViews.room}></Route>
      <Route exact path="/" component={lazyViews.home}></Route>
    </Suspense>
  </Switch>
)

export interface RoomRouteParams {
  id: string
}

export default Routes
