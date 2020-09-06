import React from 'react';
import { renderToString } from 'react-dom/server';

import StateContext from './contexts/StateContext';
import App from './App';

const asyncSomething = (response, timeout) =>
  new Promise((resolve) => setTimeout(() => resolve(response), timeout));

export default ({ recommendationsEndpoint }) => async () => {
  const state = await Promise.all([
    asyncSomething({ name: 'John' }, 1000),
    asyncSomething([1, 23, 4], 100),
  ]).then(([user, numbers]) => ({ user, numbers }));

  return renderToString(
    <StateContext.Provider value={state}>
      <div id='app'>
        <App />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__PRELOADED_STATE__=${JSON.stringify(state).replace(
            /</g,
            '\\u003c'
          )}`,
        }}
      />
    </StateContext.Provider>
  );
};
