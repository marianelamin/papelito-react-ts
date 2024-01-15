import { lazy } from 'react'

const LAZY_VIEWS = {
  HOME: lazy(async () => await import('../login/login.page')),
  ROOM: lazy(async () => await import('../room/room.page')),
  LOADING: lazy(async () => await import('../shared/loading/loading'))
}

export default LAZY_VIEWS
