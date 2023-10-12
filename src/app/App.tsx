import React, { Suspense, useMemo, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SwitchTransition, Transition } from 'react-transition-group';
import { Layout } from '../common/components';
import { PageName, routes } from './routing/appRoutes';
import { store } from '../common/store';

const App: React.FC = () => {
  let { pathname } = useLocation();
  pathname = pathname.length > 1 ? pathname.replace(/\/$/g, '') : pathname;
  const firstLoad = useRef(true);
  const outlet = useOutlet();

  const {
    layout = undefined,
    name = PageName.NOT_FOUND,
    title,
  } = routes.find((route) =>
    route.reg
      ? route.path?.replace(new RegExp(route.reg, 'g'), '') === pathname
      : route.path === pathname
  ) ?? {};

  const disableAnimation = useMemo(() => {
    if (!firstLoad.current) {
      return true;
    }
    if (firstLoad.current) {
      firstLoad.current = false;
    }

    return false;
  }, [name]);

  return (
    <Suspense>
      <Provider store={store}>
        <SwitchTransition>
          <Transition
            key={pathname}
            in={false}
            timeout={{
              enter: 1000,
              exit: 1000,
            }}
          >
            {(status) => (
              <Layout
                key={pathname}
                layout={layout}
                name={name!}
                status={status}
                title={title}
                disableAnimation={disableAnimation}
              >
                {outlet}
              </Layout>
            )}
          </Transition>
        </SwitchTransition>
      </Provider>
    </Suspense>
  );
};

export default App;
