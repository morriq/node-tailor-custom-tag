import React from 'react';
import Component from './components/Component';
import ErrorBoundary from './components/ErrorBoundary';

function App(): React.ReactElement {
  return <ErrorBoundary><Component /></ErrorBoundary>;
}

export default App;
