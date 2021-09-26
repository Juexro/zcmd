import { RouteProps } from 'react-router-dom';
import HomePage from '@/pages/home/index';
import FooPage from '@/pages/home/foo/index';
import BarPage from '@/pages/home/bar/index';
import LoginPage from '@/pages/login';

export interface RouteOptions extends RouteProps {
  routes?: RouteOptions[];
}

export const routes: RouteOptions[] = [
  {
    path: '/',
    component: HomePage,
    routes: [
      {
        path: '/foo',
        component: FooPage,
        exact: true
      },
      {
        path: '/bar',
        component: BarPage,
        exact: true
      }
    ]
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true
  }
];