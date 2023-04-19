import React, { Suspense, useMemo, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';
import { Layout } from '../common/components';
import { routes } from './routing/appRoutes';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const firstLoad = useRef(true);
  const outlet = useOutlet();

  const { layout = undefined, name } =
    routes.find((route) =>
      route.reg
        ? route.path?.replace(new RegExp(route.reg, 'g'), '') === pathname
        : route.path === pathname
    ) ?? {};

  const disableAnimation = useMemo(() => {
    if (name === 'main') {
      firstLoad.current = true;
    }

    if (name !== 'main' && !firstLoad.current) {
      return true;
    }

    if (name !== 'main' && firstLoad.current) {
      firstLoad.current = false;
    }

    return false;
  }, [name]);

  return (
    <Suspense>
      <SwitchTransition>
        <Transition
          key={pathname}
          in={false}
          timeout={{
            enter: 1000,
            exit: 1200,
          }}
        >
          {(status) => {
            status = status === 'entered' ? 'entering' : status;

            return (
              <Layout
                key={pathname}
                layout={layout}
                name={name!}
                status={status}
                disableAnimation={disableAnimation}
              >
                {outlet}
              </Layout>
            );
          }}
        </Transition>
      </SwitchTransition>
    </Suspense>
  );
};

export default App;
