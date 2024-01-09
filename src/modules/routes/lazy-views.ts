import { lazy } from 'react'

const LAZY_VIEWS = {
  HOME: lazy(async () => await import('../login/home.page')),
  ROOM: lazy(async () => await import('../room/room.page')),
  ROOM_SETUP: lazy(async () => await import('../room/room.page')),
  LOADING: lazy(async () => await import('../shared/loading/loading')),
  ADMIN: lazy(async () => await import('../room/features/admin/admin.page'))
}

export default LAZY_VIEWS
