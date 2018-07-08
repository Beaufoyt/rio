import React from 'react';
import { Route } from 'react-router-dom';

import App from './App';
import Recipes from './Recipes';
import Home from './Home';
import RecipePage from './RecipePage';

const Routes = () => (
    <App>
        <Route exact path="/" component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe/:id" component={RecipePage} />
    </App>
);

export default Routes;
