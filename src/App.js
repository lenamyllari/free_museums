import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import Add from './Add'
import Search from './Search'

function App() {
  const padding = {
    padding: 5
  };

  return (
      <div className="container">
        <Router>
          <div>
            <Link style={padding} to="/">search</Link>
            <Link style={padding} to="/add">add</Link>
          </div>

          <Switch>
            <Route path="/">
              <Search />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
