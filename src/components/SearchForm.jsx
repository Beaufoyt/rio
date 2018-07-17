import React from 'react';

import PureComponent from './PureComponent';

class SearchForm extends PureComponent {
    submit = (e) => {
        e.preventDefault();
        console.log('made it');
    };

    render() {
        return (
            <form onSubmit={this.submit} className="form-search">
                <i className="fa fa-search" />
                <input placeholder="Enter recipe here" className="search-field" type="text" />
            </form>
        );
    }
}

export default SearchForm;
