import React from 'react';
import PropTypes from 'prop-types';

import PureComponent from './PureComponent';

class SearchForm extends PureComponent {
    submit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    };

    render() {
        return (
            <form onSubmit={this.submit} className="form-search">
                <i className={`fa fa-${this.props.isLoading ? 'spinner fa-spin' : 'search'}`} />
                <input placeholder="Enter recipe here" className="search-field" type="text" />
            </form>
        );
    }
}

SearchForm.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
    isLoading: false,
    onSubmit: () => {},
};

export default SearchForm;
