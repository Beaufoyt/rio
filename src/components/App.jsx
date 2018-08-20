import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setLanguage } from '../actions/language';
import localStorage from '../helpers/localStorage';

import Header from './Header';
import Footer from './Footer';
import PureComponent from './PureComponent';

class App extends PureComponent {
    componentWillMount() {
        const preferredLanguage = localStorage.get('language');

        if (preferredLanguage) {
            this.props.setLanguage(preferredLanguage);
        }
    }

    render() {
        return (
            <div className="app">
                <Header />
                { this.props.children }
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    setLanguage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setLanguage,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(App);
