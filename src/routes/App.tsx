import React from 'react';
import { Switch, Route } from 'react-router-dom';

/** Util(s) */
import { ROUTE_URLS } from './RouteUrls';

/** Page(s) */
import Index from '../pages/Index';
import NotFound from '../pages/errors/NotFound';

const App = () => {
  return (
    <Switch>
      <Route exact path={ROUTE_URLS.HOME_URL} component={Index} />

      {/** Not found Page(s) */}
      <Route path={ROUTE_URLS.NOT_FOUND} component={NotFound} />
    </Switch>
  );
};

export default App;
