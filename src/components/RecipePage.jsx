import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import recipes from '../constants/recipes';
import scrollTop from '../helpers/scrollTop';

import PureComponent from './PureComponent';
import Recipe from './Recipe';

/* eslint-disable react/forbid-prop-types */

class RecipePage extends PureComponent {
    componentDidMount() {
        scrollTop();
    }

    render() {
        return (
            <div className="recipe-page">
                <Link
                    to="/recipes"
                    href="/recipes"
                    className="btn btn-light btn-recipe-back">
                    <i className="fa fa-arrow-left" />
                </Link>
                <Recipe recipe={recipes.find(recipe => recipe.id === this.props.match.params.id)} />
            </div>
        );
    }
}

RecipePage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default RecipePage;
