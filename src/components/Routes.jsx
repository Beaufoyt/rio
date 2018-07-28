import React from 'react';
import { Route } from 'react-router-dom';

import App from './App';
import Recipes from './Recipes';
import Home from './Home';
import RecipePage from './RecipePage';
import SearchPage from './SearchPage';

const Routes = () => (
    <App>
        <Route exact path="/" component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe/:id" component={RecipePage} />
        <Route path="/search" component={SearchPage} />
    </App>
);

export default Routes;
