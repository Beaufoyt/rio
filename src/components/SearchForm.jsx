import React from 'react';
import PropTypes from 'prop-types';

import PureComponent from './PureComponent';

class SearchForm extends PureComponent {
    state = {
        searchString: '',
        error: null,
    }

    submit = (e) => {
        e.preventDefault();

        if (this.props.isLoading) {
            return;
        }

        if (this.state.searchString.length < 3) {
            this.setState({ error: 'Enter 3 or more characters to search' });
            return;
        }

        if (this.state.error) {
            this.setState({ error: null });
        }

        this.props.onSubmit(this.state.searchString);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    hasError = () => {
        return !!this.props.error || !!this.state.error;
    }

    isDetailsActive = () => {
        return this.hasError();
    }

    render() {
        const isDetailsActive = this.isDetailsActive();

        return (
            <form onSubmit={this.submit} className="form-search">
                <i className={`search-icon fa fa-${this.props.isLoading ? 'spinner fa-spin' : 'search'}`} />
                <input
                    name="searchString"
                    placeholder="Enter recipe here"
                    value={this.state.searchString}
                    onChange={this.handleChange}
                    className={`search-field ${isDetailsActive ? 'details' : ''}`}
                    type="text" />
                { isDetailsActive &&
                    <div className="search-details-container">
                        <hr />
                        { this.hasError() &&
                            <div className="alert alert-danger" role="alert">
                                <i className="fa fa-exclamation-circle" />
                                { this.props.error || this.state.error }
                            </div>
                        }
                    </div>
                }
            </form>
        );
    }
}

SearchForm.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    error: PropTypes.string,
};

SearchForm.defaultProps = {
    isLoading: false,
    onSubmit: () => {},
    error: null,
};

export default SearchForm;
