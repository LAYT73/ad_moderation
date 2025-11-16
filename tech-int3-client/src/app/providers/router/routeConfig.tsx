import { Navigate } from 'react-router-dom';

import { ItemPage, ListPage, NotFoundPage } from '@/pages';

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
    path: '/item/:id',
    element: <ItemPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
