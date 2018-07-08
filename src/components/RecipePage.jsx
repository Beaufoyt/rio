import React from 'react';
import PropTypes from 'prop-types';

import recipes from '../constants/recipes';

import Recipe from './Recipe';

/* eslint-disable react/forbid-prop-types */

const RecipePage = (props) => {
    console.log(props);
    return (
        <div className="recipe-page">
            <Recipe recipe={recipes.find(recipe => recipe.id === props.match.params.id)} />
        </div>
    );
};

RecipePage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default RecipePage;
