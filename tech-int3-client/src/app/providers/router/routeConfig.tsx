import { Navigate } from 'react-router-dom';

import { ListPage, NotFoundPage } from '@/pages';

export const routeConfig = [
  {
    path: '/',
    element: <Navigate to="/list" replace />,
  },
  {
    path: '/list',
    element: <ListPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
