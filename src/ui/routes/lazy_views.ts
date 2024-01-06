import { lazy } from 'react'

const lazyViews = {
  home: lazy(async () => await import('../modules/login/home')),
  room: lazy(async () => await import('../modules/room-setup/room')),
  loading: lazy(async () => await import('../modules/login/loading'))
}

export default lazyViews
