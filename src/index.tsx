import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './components/App/App';
import { StoreProvider } from './hooks/useStore';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const queryClient = new QueryClient();

console.log(queryClient.getQueryCache());

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
