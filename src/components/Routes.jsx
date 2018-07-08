import React from 'react';
import { Route } from 'react-router-dom';

import App from './App';
import Recipes from './Recipes';
import Home from './Home';

const Routes = () => (
    <App>
        <Route exact path="/" component={Home} />
        <Route path="/recipes" component={Recipes} />
    </App>
);

export default Routes;
