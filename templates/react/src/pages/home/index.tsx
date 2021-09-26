import React from 'react';
import { renderRoutes, RouteComponent } from '@/routes/RootRouter';
import { useHistory } from 'react-router';

const HomePage: React.FC<RouteComponent> = ({ routes }) => {
  const history = useHistory();
  return (
    <div>
      <div>menu</div>
      <div>
        <button onClick={() => { history.push('/foo'); }}>foo</button>
        <button onClick={() => { history.push('/bar'); }}>bar</button>
      </div>
      <div>
        {
          renderRoutes(routes)
        }
      </div>
    </div>
  )
};

export default HomePage;