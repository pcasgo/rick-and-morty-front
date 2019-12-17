import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Characters from './components/Characters';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={Register} path="/register" exact />
          <PublicRoute restricted={true} component={SignIn} path="/signin" exact />
          <PrivateRoute restricted={true} component={Characters} path="/characters" exact />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
