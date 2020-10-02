import React from 'react';
import { hydrate } from 'react-dom';

import StateContext from './contexts/StateContext';
import App from './App';

export default function bootstrapApplication() {
  const preloadedState = window.__PRELOADED_STATE__;

  console.log("state:", preloadedState);

  hydrate(
    <StateContext.Provider value={preloadedState}>
      <App />
    </StateContext.Provider>,
    document.querySelector('#header')
  );

  delete window.__PRELOADED_STATE__;
}
