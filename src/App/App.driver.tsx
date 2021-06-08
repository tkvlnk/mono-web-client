import { RenderResult, render } from '@testing-library/react';

import React from 'react';

import App from './App';

export default class AppDriver {
  private renderResult!: RenderResult;

  when = {
    created: () => {
      this.renderResult = render(<App />);
    },
    loadingFinished: () => {}
  };

  get = {
    statementRowsCound: () => {}
  };
}
