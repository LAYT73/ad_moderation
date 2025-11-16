import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const ListPage = lazy(() => import('@/pages/ListPage/ListPage'));
const ItemPage = lazy(() => import('@/pages/ItemPage/ItemPage'));
const StatsPage = lazy(() => import('@/pages/StatsPage/StatsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <ListPage />,
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
    path: '/stats',
    element: <StatsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
