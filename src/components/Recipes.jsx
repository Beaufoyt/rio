import React from 'react';

import RecipeListSection from './RecipeListSection';

import menu from '../constants/menu';

const Recipes = () => {
    const mapRecipeSections = () => {
        return Object.keys(menu).map((key) => {
            return <RecipeListSection key={key} itemList={menu[key]} title={key} />;
        });
    };

    return (
        <div className="recipes-page">
            <h2>All Recipes</h2>
            <hr />
            {mapRecipeSections()}
        </div>
    );
};

export default Recipes;
