import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Household from '../assets/household.png';
import Cosmetic from '../assets/cosmetic.png';
import Remedies from '../assets/remedies.png';

import { searchRecipes } from '../actions/recipes';

import RecipesLink from './RecipesLink';
import PureComponent from './PureComponent';

class RecipesSection extends PureComponent {
    handleRecipeClick = (categoryId) => {
        this.props.searchRecipes('', categoryId, true);
    }

    render() {
        return (
            <div className="container">
                <div className="row content-block-row">
                    <div className="col-sm content-block-section">
                        <RecipesLink
                            name="1"
                            onClick={this.handleRecipeClick}
                            img={Household}
                            text="Household Recipes" />
                    </div>
                    <div className="col-sm content-block-section">
                        <RecipesLink
                            name="2"
                            onClick={this.handleRecipeClick}
                            img={Cosmetic}
                            text="Cosmetic Recipes" />
                    </div>
                    <div className="col-sm content-block-section">
                        <RecipesLink
                            name="3"
                            onClick={this.handleRecipeClick}
                            img={Remedies}
                            text="Natural Remedies" />
                    </div>
                </div>
            </div>
        );
    }
}

RecipesSection.propTypes = {
    searchRecipes: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ searchRecipes }, dispatch)
);

export default connect(null, mapDispatchToProps)(RecipesSection);
