import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { searchRecipes } from '../actions/recipes';
import categories from '../constants/categories';
import scrollTop from '../helpers/scrollTop';

import PureComponent from './PureComponent';
import SearchForm from './SearchForm';

class Recipes extends PureComponent {
    state = {
        searchError: null,
        currentCategory: '0',
    }

    componentWillMount() {
        const { categoryId } = this.props;

        if (categoryId) {
            this.setState({ currentCategory: categoryId });
        }

        if (!this.props.recipes || !this.props.recipes.length) {
            this.props.searchRecipes(this.props.searchString, this.state.currentCategory);
        }
    }

    componentDidMount() {
        scrollTop();
    }

    componentWillReceiveProps(newProps) {
        const { recipes, recipesAreLoading } = newProps;

        if (this.props.recipesAreLoading && !recipesAreLoading && recipes && recipes.length === 0) {
            this.setState({
                searchError: `No recipes found for '${this.props.searchString}'`,
            });
        } else {
            this.setState({
                searchError: null,
            });
        }
    }

    onSearchSubmit = (searchString) => {
        if (this.props.recipesAreLoading) {
            return;
        }

        this.props.searchRecipes(searchString, this.state.currentCategory);
    }

    handleChange = (e) => {
        const { target: { name, value } } = e;

        this.setState({ [name]: value }, () => {
            this.props.searchRecipes(this.props.searchString, this.state.currentCategory);
        });
    }

    searchRecipes = (e) => {
        e.preventDefault();
        const searchString = e.target.id;

        if (searchString) {
            this.onSearchSubmit(searchString);
        }
    }

    mapCategories = () => {
        return categories.map((category) => {
            const { categoryId } = category;
            return (
                <option key={categoryId} value={category.id}>
                    {_.startCase(categoryId)}
                </option>
            );
        });
    }

    renderRecipeTiles = () => {
        const { recipes } = this.props;

        return (
            <div className="list-group">
                {
                    recipes.map((recipe) => {
                        const daysAgo = moment().diff(recipe.date, 'days');

                        return (
                            <Link
                                key={`${recipe.id}`}
                                href={`/recipe/${recipe.id}`}
                                to={`/recipe/${recipe.id}`}
                                className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{recipe.title}</h5>
                                    <small>
                                        <i className="fa fa-clock margin-right-half" />
                                        {daysAgo} days ago
                                    </small>
                                </div>
                                <p className="mb-1">{recipe.description.slice(0, 160)}...</p>
                                <small>
                                    <i className="fa fa-tag margin-right-half tag-icon" />
                                    {
                                        recipe.tags.map((tag, index) => {
                                            return (
                                                <button
                                                    key={tag.text}
                                                    onClick={this.searchRecipes}
                                                    className="btn btn-link tag-link">
                                                    <small id={tag.text}>
                                                        {tag.text}{index !== recipe.tags.length - 1 ? '' : ''}
                                                    </small>
                                                </button>
                                            );
                                        })
                                    }
                                </small>
                            </Link>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        const { recipes } = this.props;
        console.log(this.state.searchError);

        return (
            <div className="recipes-page">
                <div className="recipes-controls-container">
                    <SearchForm
                        searchStyle=""
                        placeholder="Find a recipe"
                        defaultValue={this.props.searchString}
                        isLoading={this.props.recipesAreLoading}
                        onSubmit={this.onSearchSubmit} />
                    <div className="form-group form-group-inline">
                        <label htmlFor="recipe-categories">Category</label>
                        <select
                            name="currentCategory"
                            onChange={this.handleChange}
                            value={this.state.currentCategory}
                            id="recipe-categories"
                            className="form-control recipes-dropdown">
                            <option value={0}>
                                All
                            </option>
                            {this.mapCategories()}
                        </select>
                    </div>
                </div>
                <hr />
                { recipes && recipes.length ?
                    this.renderRecipeTiles() :
                    <div className="alert alert-info no-results no-margin-bottom" role="alert">
                        <i className="fa fa-sad-tear" />
                        No results
                    </div>
                }
            </div>
        );
    }
}

Recipes.propTypes = {
    // location: PropTypes.shape({
    //     pathname: PropTypes.string.isRequired,
    // }).isRequired,
    recipesAreLoading: PropTypes.bool.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })),
    searchRecipes: PropTypes.func.isRequired,
    searchString: PropTypes.string,
    categoryId: PropTypes.string,
};

Recipes.defaultProps = {
    recipes: null,
    searchString: null,
    categoryId: null,
};

const mapStateToProps = state => ({
    recipesAreLoading: state.recipes.areLoading,
    recipes: state.recipes.searchResults,
    searchString: state.recipes.searchString,
    categoryId: state.recipes.categoryId,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ searchRecipes }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
