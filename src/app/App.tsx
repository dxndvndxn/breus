import React, { Suspense } from 'react';
import './App.scss';

import { Outlet } from 'react-router-dom';
import { Layout } from '../common/components/layout/Layout';

const App: React.FC = () => (
  <Suspense fallback={<>Загрузка</>}>
    <Layout>
      <Outlet />
    </Layout>
  </Suspense>
);

export default App;
