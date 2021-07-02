import constante from 'constate';
import { useState } from 'react';

import {
  StatementsDataLayer,
  StatementsDataLayerDeps
} from '../services/StatementsDataLayer';

export const [StatementsDataLayerProvider, useStatementsDataLayer] = constante(
  (deps: StatementsDataLayerDeps) => {
    const [statementsDataLayer] = useState(() => new StatementsDataLayer(deps));
    return statementsDataLayer;
  }
);
