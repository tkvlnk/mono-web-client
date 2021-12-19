import React from 'react';

import { MainView } from '../MainView/MainView';
import { Providers } from '../Providers/Providers';

export const App = () => (
  <Providers>
    <MainView />
  </Providers>
);
