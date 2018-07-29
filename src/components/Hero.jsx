import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { searchRecipes } from '../actions/recipes';

import SearchForm from './SearchForm';
import PureComponent from './PureComponent';

class Hero extends PureComponent {
    state = {
        searchString: null,
        searchError: null,
    }

    componentDidMount() {
        console.log(this.props.recipes);
    }

    componentWillReceiveProps(newProps) {
        const { recipes, recipesAreLoading } = newProps;

        if (this.props.recipesAreLoading && !recipesAreLoading) {
            if (recipes) {
                if (recipes.length === 0) {
                    this.setState({
                        searchError: `No recipes found for '${this.state.searchString}'`,
                    });
                } else {
                    this.props.history.push('/search');
                }
            }
        }
    }

    onSearchSubmit = (searchString) => {
        this.setState({ searchString, searchError: null });
        this.props.searchRecipes(searchString);
    }

    render() {
        return (
            <div className="hero-banner">
                <div className="content">
                    <h2>Aromatherapy & Natural Cosmetic Recipes</h2>
                    <SearchForm
                        error={this.state.searchError}
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
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

Hero.defaultProps = {
    recipes: null,
    history: { push: () => {} },
};

const mapStateToProps = state => ({
    recipesAreLoading: state.recipes.areLoading,
    recipes: state.recipes.searchResults,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ searchRecipes }, dispatch)
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hero));
