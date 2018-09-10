import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchCategories } from '../actions/recipes';
import { fetchInventory, searchInventory } from '../actions/inventory';
import scrollTop from '../helpers/scrollTop';
import translator from '../helpers/translator';

import PureComponent from './PureComponent';
import SearchForm from './SearchForm';
import Translator from './Translator';
import InventoryCard from './InventoryCard';

const ESCAPE_KEY = 27;

class Inventory extends PureComponent {
    state = {
        currentSearchString: '',
        currentCategory: '0',
        activeInventoryItem: null,
        controlsExpanded: false,
    }

    componentWillMount() {
        const { categoryId } = this.props;
        const parsedCategoryId = parseInt(categoryId, 10);

        if (parsedCategoryId) {
            this.setState({ currentCategory: categoryId }, () => {
                this.props.fetchInventory(categoryId);
            });
        } else {
            this.props.fetchInventory();
        }

        this.props.fetchCategories();
        document.addEventListener('keydown', this.handleKeyDown);
    }


    componentDidMount() {
        scrollTop();
    }

    componentWillUpdate(newProps, newState) {
        if (this.state.currentCategory !== newState.currentCategory) {
            this.retrieveInventory(newState.currentCategory, this.state.currentSearchString);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    onSearchSubmit = (searchString) => {
        this.setState({ currentSearchString: searchString }, () => {
            this.retrieveInventory(this.state.currentCategory, searchString);
        });
    }

    setActiveInventoryItem = (e) => {
        const { target: { id } } = e;
        const targetInventoryItem = this.props.inventory.find(item => item.id === parseInt(id, 10));

        if (targetInventoryItem && targetInventoryItem.inStock !== null) {
            this.setState({ activeInventoryItem: id });
            document.body.classList.add('no-scroll');
        }
    }

    setCategory = (id) => {
        this.setState({ currentCategory: id });
        this.closeActiveInventory();
    }

    retrieveInventory = (categoryId, searchString) => {
        const parsedCategory = categoryId === '0' ? undefined : categoryId;

        if (!searchString) {
            this.props.fetchInventory(parsedCategory);
        } else {
            this.props.searchInventory(
                searchString,
                this.props.activeLanguage,
                parsedCategory,
            );
        }
    }

    handleKeyDown = (event) => {
        switch (event.keyCode) {
        case ESCAPE_KEY:
            this.closeActiveInventory();
            break;
        default:
            break;
        }
    }

    closeActiveInventory = () => {
        this.setState({ activeInventoryItem: null });
        document.body.classList.remove('no-scroll');
    }

    handleInventoryEnter = (e) => {
        this.setActiveInventoryItem(e);
    }

    handleChange = (e) => {
        const { target: { name, value } } = e;

        this.setState({ [name]: value });
    }

    toggleControls = () => {
        this.setState({ controlsExpanded: !this.state.controlsExpanded });
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

    renderInventory = () => {
        const { inventory, activeLanguage } = this.props;

        return inventory && inventory.map((inventoryItem, index) => {
            const { id } = inventoryItem;

            return (
                <InventoryCard
                    key={id}
                    inventoryItem={inventoryItem}
                    tabIndex={index}
                    onEnter={this.handleInventoryEnter}
                    onClick={this.setActiveInventoryItem}
                    activeLanguage={activeLanguage} />
            );
        });
    }

    renderControls = (type) => {
        return (
            <div className={`form-group form-group-inline ${type}-controls`}>
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
        );
    }

    render() {
        const { activeInventoryItem, controlsExpanded } = this.state;
        const {
            searchInventoryIsLoading, fetchInventoryIsLoading, activeLanguage, searchString, inventory,
        } = this.props;

        return (
            <div className="inventory-container">
                <div className="inventory-controls-container">
                    <SearchForm
                        typeSubmit
                        isLoading={fetchInventoryIsLoading || searchInventoryIsLoading}
                        searchStyle=""
                        placeholder={translator('inventory-search', activeLanguage)}
                        defaultValue={searchString}
                        onSubmit={this.onSearchSubmit} />
                    {this.renderControls('desktop')}
                    <button className="btn btn-light btn-controls" onClick={this.toggleControls}>
                        <i className={`fa fa-${controlsExpanded ? 'times' : 'ellipsis-v'}`} />
                    </button>
                </div>
                { controlsExpanded &&
                    this.renderControls('mobile') }
                <hr />
                <div className="container">
                    <div className="row">
                        {this.renderInventory()}
                    </div>
                </div>
                { activeInventoryItem &&
                    <div>
                        <div
                            tabIndex={0}
                            onClick={this.closeActiveInventory}
                            onKeyUp={this.handleKeyDown}
                            role="button"
                            className="page-overlay inventory-overlay" />
                        <InventoryCard
                            onCategoryClick={this.setCategory}
                            isExpanded
                            inventoryItem={inventory.find(item => (
                                item.id === parseInt(activeInventoryItem, 10)
                            ))}
                            tabIndex={-1}
                            activeLanguage={activeLanguage} />
                    </div> }
            </div>
        );
    }
}

Inventory.propTypes = {
    searchString: PropTypes.string,
    categoryId: PropTypes.string,
    fetchInventoryIsLoading: PropTypes.bool.isRequired,
    searchInventoryIsLoading: PropTypes.bool.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchInventory: PropTypes.func.isRequired,
    searchInventory: PropTypes.func.isRequired,
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
    searchInventoryIsLoading: state.inventory.searchIsLoading,
    inventory: state.inventory.inventory,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchCategories, fetchInventory, searchInventory }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
