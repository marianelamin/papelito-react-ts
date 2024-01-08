import { lazy } from 'react'

const LAZY_VIEWS = {
  HOME: lazy(async () => await import('../features/login/home.page')),
  ROOM: lazy(async () => await import('../features/room/room.page')),
  ROOM_SETUP: lazy(async () => await import('../features/room/room.page')),
  LOADING: lazy(async () => await import('../features/shared/loading/loading')),
  ADMIN: lazy(async () => await import('../features/admin/admin.page'))
}

export default LAZY_VIEWS
