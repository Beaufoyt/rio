import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import scrollTop from '../helpers/scrollTop';
import { fetchCategories } from '../actions/recipes';

import PureComponent from './PureComponent';

class InventoryAdd extends PureComponent {
    componentDidMount() {
        scrollTop();
        console.log(this.props.categories, this.props.fetchCategoriesIsLoading);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('made it');
    }

    render() {
        return (
            <div className="inventory-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row margin-top">
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="nameEn1">NameEn</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nameEn1"
                                        placeholder="Enter English name" />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="nameFr1">NameFr</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nameFr1"
                                        placeholder="Enter French Name" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <select value="" className="form-control margin-top margin-bottom">
                                    <option disabled value="">Category</option>
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <select value="" className="form-control margin-top margin-bottom">
                                    <option disabled value="">Retailer</option>
                                </select>
                            </div>
                        </div>
                        <div className="row margin-top">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="scientificName1">Scientific Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="scientificName1"
                                        placeholder="Scientific Name" />
                                </div>
                            </div>
                        </div>
                        <div className="row margin-top">
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="descriptionEn1">DescriptionEn</label>
                                    <textarea className="form-control" id="descriptionEn1" rows="3" />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="descriptionFr1">DescriptionFr</label>
                                    <textarea className="form-control" id="descriptionFr1" rows="3" />
                                </div>
                            </div>
                        </div>
                        <div className="row margin-top margin-bottom-double">
                            <div className="col-sm-12">
                                <div className="form-check fancy-check">
                                    <input type="checkbox" className="form-check-input" id="inStock1" />
                                    <label className="form-check-label" htmlFor="inStock1">In Stock</label>
                                </div>
                            </div>
                        </div>
                        <div className="row margin-top">
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-primary btn-icon margin-right">
                                    <i className="fa fa-plus-square" />
                                    Add Item
                                </button>
                                <Link to="/inventory" href="/inventory" className="btn btn-light">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

InventoryAdd.propTypes = {
    fetchCategoriesIsLoading: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })),
};

InventoryAdd.defaultProps = {
    categories: null,
};

const mapStateToProps = state => ({
    fetchCategoriesIsLoading: state.recipes.fetchCategoriesIsLoading,
    categories: state.recipes.categories,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchCategories }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(InventoryAdd);
