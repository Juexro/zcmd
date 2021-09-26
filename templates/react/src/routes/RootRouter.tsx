import { Suspense } from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import * as history from 'history';
import userStore from '@/stores/user';
import { RouteOptions, routes } from './index';

export interface RouteComponent {
  routes: RouteOptions[];
}

export const customHistory = history.createBrowserHistory();

export function renderRoutes(routes: RouteOptions[]) {
  return (
    <>
      {
        routes.map((config, index) => {
          const { component: Component, routes, ...rest } = config;
          return (
            <Route key={`${config.path}${index}`} { ...rest } render={(props) => {
              if (config.path !== '/login' && !userStore.info) {
                return (<Redirect to="/login" exact />);
              }
              if (Component) {
                return <Component {...props} {...(routes ? { routes } : {})} />;
              }
            }} />
          );
        })
      }
    </>
  );
}

export default function RootRouter() {
  return (
    <Router history={customHistory}>
      <Switch>
        <Suspense fallback={<div />}>
          {
            renderRoutes(routes)
          }
        </Suspense>
      </Switch>
    </Router>
  );
}