import React from 'react';

import { Switch, Route } from 'react-router-dom';

import CreateTransaction from '../pages/CreateTransaction';
import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/import" component={Import} />
    <Route path="/add" component={CreateTransaction} />
  </Switch>
);

export default Routes;
