import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Home from 'views/Home';
import NotFound from 'views/NotFound';

export default function() {
  return (
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Route>
  );
}
