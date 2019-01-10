import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AddSignupPage from '../pages/AddSignupPage';
import SignupListingsPage from '../pages/SignupListingsPage';

export default () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={SignupListingsPage} />
      <Route exact path='/sign-up' component={AddSignupPage} />
    </div>
  </BrowserRouter>
);
