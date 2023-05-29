import { lazy } from 'react'

const lazyViews = {
  home: lazy(() => import('ui/pages/home')),
  room: lazy(() => import('ui/pages/room')),
  loading: lazy(() => import('ui/pages/loading')),
}

export default lazyViews
