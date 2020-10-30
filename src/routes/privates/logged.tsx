import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES_HOME, ROUTES_LIST } from '../../constants';
import HomePage from '../../pages/Home';
import ListPage from '../../pages/ListPage';

export default function LoggedRoute() {

  return (
    <Switch>
      <Route exact path={ROUTES_HOME()} component={HomePage} />
      <Route exact path={ROUTES_LIST()} component={ListPage} />
    </Switch>
  );
}
