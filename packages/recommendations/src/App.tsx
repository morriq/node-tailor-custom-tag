import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';

function App(): React.ReactElement {
  return <ErrorBoundary><div onClick={() => alert()}>recommendations</div></ErrorBoundary>;
}

export default App;
