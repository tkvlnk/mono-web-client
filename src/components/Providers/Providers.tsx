import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ApiProvider } from '../../hooks/useApi';
import { StoreProvider } from '../../hooks/useStore/useStore';

const queryClient = new QueryClient();

export const Providers: React.FC = ({ children }) => (
  <ApiProvider>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>{children}</StoreProvider>
    </QueryClientProvider>
  </ApiProvider>
);
