import React, { Suspense } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';
import { Layout } from '../common/components';
import { routes } from './routing/appRoutes';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const { layout = undefined } =
    routes.find((route) => route.path === location.pathname) ?? {};
  const outlet = useOutlet();

  const onExiting = (node: HTMLElement) => {
    console.log('exit', node);
  };

  return (
    <Suspense>
      <SwitchTransition>
        <Transition
          key={pathname}
          in={true}
          timeout={5000}
          onEnter={(node: HTMLElement) => {
            console.log(node);
          }}
          onExit={onExiting}
        >
          <Layout type={layout}>{outlet}</Layout>
        </Transition>
      </SwitchTransition>
    </Suspense>
  );
};

export default App;
