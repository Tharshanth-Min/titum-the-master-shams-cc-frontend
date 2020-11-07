import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch} from "react-router-dom";
import Routes from './_routes';

function App() {
  return (
    <Router>
      <Switch>
          <Routes />
      </Switch>
    </Router>
  );
}

export default App;
//basename={'/demo'}