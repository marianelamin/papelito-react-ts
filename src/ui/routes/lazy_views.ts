import { lazy } from 'react'

const lazyViews = {
  home: lazy(async () => await import('ui/modules/login/home')),
  room: lazy(async () => await import('ui/modules/room-setup/room')),
  loading: lazy(async () => await import('ui/modules/login/loading'))
}

export default lazyViews
