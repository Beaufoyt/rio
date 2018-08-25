import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchCategories } from '../actions/recipes';
import { fetchInventory } from '../actions/inventory';
import scrollTop from '../helpers/scrollTop';
import translator from '../helpers/translator';

import PureComponent from './PureComponent';
import SearchForm from './SearchForm';
import Translator from './Translator';

class Inventory extends PureComponent {
    state = {
        currentCategory: '0',
    }

    componentWillMount() {
        const { categoryId } = this.props;

        if (categoryId) {
            this.setState({ currentCategory: categoryId });
            this.props.fetchInventory(categoryId);
        } else {
            this.props.fetchInventory();
        }

        this.props.fetchCategories();
    }

    componentDidMount() {
        scrollTop();
    }

    componentWillUpdate(newProps, newState) {
        let currentCategory = parseInt(newState.currentCategory, 10);

        currentCategory = currentCategory === 26 ? null : currentCategory;
        currentCategory = currentCategory === 0 ? undefined : currentCategory;

        if (this.state.currentCategory !== newState.currentCategory) {
            this.props.fetchInventory(currentCategory);
        }
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

    renderStockIndicator = (inStock) => {
        switch (inStock) {
        case 0:
            return (
                <h5 className="stock-indicator" style={{ color: '#721c24' }}>
                    <i className="fa fa-times" />
                    Out of stock
                </h5>
            );
        case 1:
            return (
                <h5 className="stock-indicator" style={{ color: '#155724' }}>
                    <i className="fa fa-check" />
                    In stock
                </h5>
            );
        default:
            return (
                <h5 className="stock-indicator">
                    <i className="fa fa-infinity" />
                    Infinite
                </h5>
            );
        }
    }

    renderInventory = () => {
        const { inventory, activeLanguage } = this.props;

        return inventory && inventory.map((inventoryItem) => {
            const { scientificName, inStock } = inventoryItem;

            return (
                <div className="inventory-grid-item col-sm-12 col-md-6 col-lg-4 col-xl-3 inline">
                    <div className=" inventory-item" style={{ cursor: inStock === null ? 'initial' : 'pointer' }}>
                        <h5 className="name">
                            {inventoryItem[`name${_.startCase(activeLanguage)}`]}
                        </h5>
                        { scientificName &&
                            <h6 className="scientific-name">{scientificName}</h6>
                        }
                        { this.renderStockIndicator(inStock) }
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="inventory-container">
                <div className="inventory-controls-container">
                    <SearchForm
                        isLoading={this.props.fetchInventoryIsLoading}
                        searchStyle=""
                        placeholder={translator('inventory-search', this.props.activeLanguage)}
                        defaultValue={this.props.searchString}
                        onSubmit={this.onSearchSubmit} />
                    <div className="form-group form-group-inline">
                        <label htmlFor="recipe-categories"><Translator languageKey="category" /></label>
                        <select
                            disabled={this.props.fetchCategoriesIsLoading}
                            name="currentCategory"
                            onChange={this.handleChange}
                            value={this.state.currentCategory}
                            id="recipe-categories"
                            className="form-control recipes-dropdown">
                            <option value={0}>
                                <Translator languageKey="all" />
                            </option>
                            {this.mapCategories()}
                        </select>
                    </div>
                </div>
                <hr />
                <div className="container">
                    <div className="row">
                        {this.renderInventory()}
                    </div>
                </div>
            </div>
        );
    }
}

Inventory.propTypes = {
    searchString: PropTypes.string,
    categoryId: PropTypes.string,
    fetchInventoryIsLoading: PropTypes.bool.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchInventory: PropTypes.func.isRequired,
    activeLanguage: PropTypes.string.isRequired,
    fetchCategoriesIsLoading: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })),
    inventory: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })),
};

Inventory.defaultProps = {
    searchString: null,
    categoryId: null,
    categories: null,
    inventory: null,
};

const mapStateToProps = state => ({
    searchString: state.recipes.searchString,
    categoryId: state.recipes.categoryId,
    fetchCategoriesIsLoading: state.recipes.fetchCategoriesIsLoading,
    categories: state.recipes.categories,
    activeLanguage: state.language.activeLanguage,
    fetchInventoryIsLoading: state.inventory.fetchIsLoading,
    inventory: state.inventory.inventory,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchCategories, fetchInventory }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
