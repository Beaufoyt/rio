import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { searchRecipes } from '../actions/recipes';

import SearchForm from './SearchForm';
import PureComponent from './PureComponent';

class SearchPage extends PureComponent {
    state = {
        searchString: null,
        searchError: null,
    }

    componentDidMount() {
        console.log(this.props.recipes);
    }

    componentWillReceiveProps(newProps) {
        const { recipes, recipesAreLoading } = newProps;

        if (this.props.recipesAreLoading && !recipesAreLoading && recipes && recipes.length === 0) {
            this.setState({
                searchError: `No recipes found for '${this.state.searchString}'`,
            });
        }
    }

    onSearchSubmit = (searchString) => {
        this.setState({ searchString, searchError: null });
        this.props.searchRecipes(searchString);
    }

    render() {
        return (
            <div className="search-page-container">
                <SearchForm
                    defaultValue={this.props.searchString}
                    error={this.state.searchError}
                    isLoading={this.props.recipesAreLoading}
                    onSubmit={this.onSearchSubmit} />
                <hr className="margin-top-double margin-bottom-double" />
            </div>
        );
    }
}

SearchPage.propTypes = {
    recipesAreLoading: PropTypes.bool.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })),
    searchRecipes: PropTypes.func.isRequired,
    searchString: PropTypes.string,
};

SearchPage.defaultProps = {
    recipes: null,
    searchString: null,
};

const mapStateToProps = state => ({
    recipesAreLoading: state.recipes.areLoading,
    recipes: state.recipes.searchResults,
    searchString: state.recipes.searchString,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ searchRecipes }, dispatch)
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
