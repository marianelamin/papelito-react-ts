import { lazy } from 'react';

const lazyViews = {
  home: lazy(() => import('ui/modules/login/home')),
  room: lazy(() => import('ui/modules/room-setup/room')),
  loading: lazy(() => import('ui/modules/login/loading')),
};

export default lazyViews;
