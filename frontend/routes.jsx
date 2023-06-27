import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import ConferencePage from './ConferencePage';

const App = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/">
          {isAuthenticated ? <DashboardPage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/conference/:id" component={ConferencePage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;