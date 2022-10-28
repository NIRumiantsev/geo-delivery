import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AppWrapper } from 'UI';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <Router>
      <AppWrapper>
        <AppRoutes/>
      </AppWrapper>
    </Router>
  );
}

export default App;
