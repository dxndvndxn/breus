import React, { Suspense } from 'react';
import './App.scss';

import { Outlet } from 'react-router-dom';

const App: React.FC = () => (
  <Suspense fallback={<>Загрузка</>}>
    <Outlet />
  </Suspense>
);

export default App;
