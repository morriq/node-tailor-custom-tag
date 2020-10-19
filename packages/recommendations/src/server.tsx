import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import StateContext from './contexts/StateContext';
import App from './App';


export default (payload) => () => {
    const state = payload();

    return renderToNodeStream(
        <StateContext.Provider value={state}>
            <div id='rec'>
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
