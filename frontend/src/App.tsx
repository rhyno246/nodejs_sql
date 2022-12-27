import * as React from 'react';
import './scss/app.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './views/client/Home';
function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
    </Router>
  );
}

export default App;
