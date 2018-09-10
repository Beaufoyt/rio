import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PureComponent from './PureComponent';

class SearchForm extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = _.debounce(this.handleSubmit, 250);
    }

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

        if (this.props.isLoading || this.state.searchString.length < 3) {
            return;
        }

        this.handleSubmit(this.state.searchString);
    };

    clearString = () => {
        this.setState({ searchString: '' });
        this.handleSubmit('');
    }

    handleSubmit = (string) => {
        this.props.onSubmit(string);
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });

        if (this.props.typeSubmit && (value.length >= 3 || value.length === 0)) {
            this.handleSubmit(value);
        }
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
                { this.state.searchString &&
                    <button onClick={this.clearString} className="clear-button">
                        <i className="fa fa-times-circle" />
                    </button> }
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
    typeSubmit: PropTypes.bool,
};

SearchForm.defaultProps = {
    isLoading: false,
    onSubmit: () => {},
    defaultValue: '',
    searchStyle: 'shadow-lg',
    searchString: '',
    placeholder: 'Enter search term here',
    typeSubmit: false,
};

const mapStateToProps = state => ({
    searchString: state.recipes.searchString,
});

export default connect(mapStateToProps, null)(SearchForm);
