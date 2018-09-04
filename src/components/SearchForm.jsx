import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PureComponent from './PureComponent';

class SearchForm extends PureComponent {
    state = {
        searchString: '',
    }

    componentWillMount() {
        this.setState({ searchString: this.props.defaultValue });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.searchString && this.props.searchString !== newProps.searchString) {
            this.setState({ searchString: newProps.searchString });
        }
    }

    submit = (e) => {
        e.preventDefault();

        if (this.props.isLoading) {
            return;
        }

        this.props.onSubmit(this.state.searchString);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <form onSubmit={this.submit} className={`form-search ${this.props.searchStyle}`}>
                <i className={`search-icon fa fa-${this.props.isLoading ? 'spinner fa-spin' : 'search'}`} />
                <input
                    name="searchString"
                    placeholder={this.props.placeholder}
                    value={this.state.searchString}
                    onChange={this.handleChange}
                    className="search-field border"
                    type="text" />
            </form>
        );
    }
}

SearchForm.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    defaultValue: PropTypes.string,
    searchStyle: PropTypes.string,
    searchString: PropTypes.string,
    placeholder: PropTypes.string,
};

SearchForm.defaultProps = {
    isLoading: false,
    onSubmit: () => {},
    defaultValue: '',
    searchStyle: 'shadow-lg',
    searchString: '',
    placeholder: 'Enter search term here',
};

const mapStateToProps = state => ({
    searchString: state.recipes.searchString,
});

export default connect(mapStateToProps, null)(SearchForm);
