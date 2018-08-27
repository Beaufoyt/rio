import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import classnames from '../helpers/classnames';

import PureComponent from './PureComponent';
import StockIndicator from './StockIndicator';

class InventoryCard extends PureComponent {
    handleEnter = (e) => {
        if (e.keyCode === 13) {
            this.props.onEnter(e);
        }
    }

    handleCategoryClick = (e) => {
        this.props.onCategoryClick(e.currentTarget.id);
    }

    renderStockIndicator = (inStock, id) => {
        switch (inStock) {
        case 0:
            return (
                <StockIndicator color="#721c24" canToggle id={id} icon="times" languageKey="outofstock" />
            );
        case 1:
            return (
                <StockIndicator color="#155724" canToggle id={id} icon="check" languageKey="instock" />
            );
        default:
            return (
                <StockIndicator icon="infinity" languageKey="infinite" />
            );
        }
    }

    render() {
        const {
            id, scientificName, inStock, category, retailer,
        } = this.props.inventoryItem;
        const {
            activeLanguage, index, onClick, isExpanded,
        } = this.props;
        const name = this.props.inventoryItem[`name${_.startCase(activeLanguage)}`];
        const description = this.props.inventoryItem[`description${_.startCase(activeLanguage)}`];
        const categoryName = category && category[`name${_.startCase(activeLanguage)}`];

        return (
            <div className={classnames('inventory-grid-item', {
                'col-sm-12 col-md-6 col-lg-4 col-xl-3 contracted inline': !isExpanded,
            })}>
                <div
                    id={id}
                    tabIndex={index}
                    onClick={onClick}
                    onKeyUp={this.handleEnter}
                    role="button"
                    className={classnames('inventory-item', {
                        'inventory-item-expanded': isExpanded,
                    })}
                    style={{ cursor: inStock === null || isExpanded ? 'initial' : 'pointer' }}>
                    <h5 className="name">
                        {name}
                    </h5>
                    { scientificName &&
                        <h6 className="scientific-name">{scientificName}</h6> }
                    { this.renderStockIndicator(inStock, id) }
                    { isExpanded && !!description &&
                        <p className="description">{description}</p> }
                    { isExpanded && (!!retailer || !!category) &&
                        <div className="inventory-footer">
                            { !!category &&
                                <span className="pull-left">
                                    <button
                                        className="btn-category"
                                        id={category.id}
                                        onClick={this.handleCategoryClick}>
                                        <i className="fa fa-th-large" />
                                        {categoryName}
                                    </button>
                                </span> }
                            { !!retailer &&
                                <span className="pull-right">
                                    <a href={retailer.url} target="_blank" rel="noreferrer noopener">
                                        <i className="fa fa-globe-americas" />
                                        {retailer.name}
                                    </a>
                                </span> }
                        </div> }
                </div>
            </div>
        );
    }
}

InventoryCard.propTypes = {
    inventoryItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        scientificName: PropTypes.string,
        inStock: PropTypes.number,
        description: PropTypes.string,
        category: PropTypes.shape({
            id: PropTypes.number,
        }),
        retailer: PropTypes.shape({
            id: PropTypes.number,
        }),
    }).isRequired,
    index: PropTypes.number,
    activeLanguage: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onEnter: PropTypes.func,
    isExpanded: PropTypes.bool,
    onCategoryClick: PropTypes.func,
};

InventoryCard.defaultProps = {
    index: 0,
    onClick: () => {},
    onEnter: () => {},
    isExpanded: false,
    onCategoryClick: null,
};

export default InventoryCard;
