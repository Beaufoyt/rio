import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PureComponent from './PureComponent';

class SearchForm extends PureComponent {
    state = {
        searchString: '',
        error: null,
    }

    componentWillMount() {
        this.setState({ searchString: this.props.defaultValue });
    }

    componentWillReceiveProps(newProps) {
        if (this.state.searchString && newProps.searchString && this.props.searchString !== newProps.searchString) {
            this.setState({ searchString: newProps.searchString });
        }
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
            <form onSubmit={this.submit} className={`form-search ${this.props.searchStyle}`}>
                <i className={`search-icon fa fa-${this.props.isLoading ? 'spinner fa-spin' : 'search'}`} />
                <input
                    name="searchString"
                    placeholder="Enter recipe here"
                    value={this.state.searchString}
                    onChange={this.handleChange}
                    className={`search-field ${isDetailsActive ? 'details' : ''} border`}
                    type="text" />
                { isDetailsActive &&
                    <div>
                        <div className="search-details-container border">
                            <hr />
                            { this.hasError() &&
                            <div className="alert alert-danger" role="alert">
                                <i className="fa fa-exclamation-circle" />
                                { this.state.error || this.props.error }
                            </div>
                            }
                        </div>
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
    defaultValue: PropTypes.string,
    searchStyle: PropTypes.string,
    searchString: PropTypes.string,
};

SearchForm.defaultProps = {
    isLoading: false,
    onSubmit: () => {},
    error: null,
    defaultValue: '',
    searchStyle: 'shadow-lg',
    searchString: '',
};

const mapStateToProps = state => ({
    searchString: state.recipes.searchString,
});

export default connect(mapStateToProps, null)(SearchForm);
