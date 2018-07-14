import React from 'react';
import PropTypes from 'prop-types';

import scrollTop from '../helpers/scrollTop';
import scrollToAnchor from '../helpers/scrollToAnchor';
import { headerHeight } from '../constants/dimensions';
import menu from '../constants/menu';

import RecipeListSection from './RecipeListSection';
import PureComponent from './PureComponent';

class Recipes extends PureComponent {
    componentDidMount() {
        scrollTop();
        scrollToAnchor(this.props.location, { x: 0, y: -headerHeight });
    }

    mapRecipeSections = () => {
        return Object.keys(menu).map((key) => {
            return <RecipeListSection id={key} key={key} itemList={menu[key]} title={key} />;
        });
    };

    render() {
        return (
            <div className="recipes-page">
                <h2>All Recipes</h2>
                <hr />
                {this.mapRecipeSections()}
            </div>
        );
    }
}

Recipes.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default Recipes;
