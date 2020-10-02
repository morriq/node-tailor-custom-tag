import React from 'react';
import Component from './components/Component';
import ErrorBoundary from './components/ErrorBoundary';

function App(): JSX.Element {
  return <ErrorBoundary><Component /></ErrorBoundary>;
}

export default App;
