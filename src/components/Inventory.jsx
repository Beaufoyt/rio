import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchCategories } from '../actions/recipes';
import scrollTop from '../helpers/scrollTop';

import PureComponent from './PureComponent';
import SearchForm from './SearchForm';

class Inventory extends PureComponent {
    state = {
        currentCategory: '0',
    }

    componentWillMount() {
        const { categoryId } = this.props;

        if (categoryId) {
            this.setState({ currentCategory: categoryId });
        }

        this.props.fetchCategories();
    }

    componentDidMount() {
        scrollTop();
    }

    handleChange = (e) => {
        const { target: { name, value } } = e;

        this.setState({ [name]: value });
    }

    searchRecipes = (e) => {
        e.preventDefault();
        const searchString = e.target.id;

        if (searchString) {
            this.onSearchSubmit(searchString);
        }
    }

    mapCategories = () => {
        const { categories } = this.props;

        return categories && categories.map((category) => {
            const { id } = category;
            return (
                <option key={id} value={id}>
                    {category[`name${_.startCase(this.props.activeLanguage)}`]}
                </option>
            );
        });
    }

    render() {
        return (
            <div className="inventory-container">
                <div className="recipes-controls-container">
                    <SearchForm
                        searchStyle=""
                        placeholder={this.props.activeLanguage === 'en' ? 'Search the tool chest' : 'rechercher la boîte à outils'}
                        defaultValue={this.props.searchString}
                        onSubmit={this.onSearchSubmit} />
                    <div className="form-group form-group-inline">
                        <label htmlFor="recipe-categories">Category</label>
                        <select
                            disabled={this.props.fetchCategoriesIsLoading}
                            name="currentCategory"
                            onChange={this.handleChange}
                            value={this.state.currentCategory}
                            id="recipe-categories"
                            className="form-control recipes-dropdown">
                            <option value={0}>
                                { this.props.activeLanguage === 'en' ? 'All' : 'Tout' }
                            </option>
                            {this.mapCategories()}
                        </select>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

Inventory.propTypes = {
    // location: PropTypes.shape({
    //     pathname: PropTypes.string.isRequired,
    // }).isRequired,
    searchString: PropTypes.string,
    categoryId: PropTypes.string,
    fetchCategories: PropTypes.func.isRequired,
    activeLanguage: PropTypes.string.isRequired,
    fetchCategoriesIsLoading: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })),
};

Inventory.defaultProps = {
    searchString: null,
    categoryId: null,
    categories: null,
};

const mapStateToProps = state => ({
    searchString: state.recipes.searchString,
    categoryId: state.recipes.categoryId,
    fetchCategoriesIsLoading: state.recipes.fetchCategoriesIsLoading,
    categories: state.recipes.categories,
    activeLanguage: state.language.activeLanguage,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchCategories }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
