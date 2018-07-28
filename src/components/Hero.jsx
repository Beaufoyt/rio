import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchRecipes } from '../actions/recipes';

import SearchForm from './SearchForm';
import PureComponent from './PureComponent';

class Hero extends PureComponent {
    componentDidMount() {
        console.log(this.props.recipes);
    }

    onSearchSubmit = (searchString) => {
        this.props.searchRecipes(searchString);
    }

    render() {
        return (
            <div className="hero-banner">
                <div className="content">
                    <h2>Aromatherapy & Natural Cosmetic Recipes</h2>
                    <SearchForm
                        isLoading={this.props.recipesAreLoading}
                        onSubmit={this.onSearchSubmit} />
                </div>
            </div>
        );
    }
}

Hero.propTypes = {
    recipesAreLoading: PropTypes.bool.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })),
    searchRecipes: PropTypes.func.isRequired,
};

Hero.defaultProps = {
    recipes: null,
};

const mapStateToProps = state => ({
    recipesAreLoading: state.recipes.areLoading,
    recipesSearchList: state.recipes.searchResults,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ searchRecipes }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
