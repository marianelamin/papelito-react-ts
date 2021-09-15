import { lazy } from 'react'

const lazyViews = {
  home: lazy(() => import('ui/pages/home')),
  room: lazy(() => import('ui/pages/room')),
}

export default lazyViews
