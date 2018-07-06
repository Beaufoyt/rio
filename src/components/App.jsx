import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchTool } from '../actions/workshop';

import PureComponent from './PureComponent';
import Header from './Header';
import Hero from './Hero';

class App extends PureComponent {
    setTool = (e) => {
        console.log('made it', e.target.name);
        this.props.switchTool('line');
    }

    isActive = (key) => {
        return key === this.props.tool;
    }

    render() {
        return (
            <div>
                <Header />
                <Hero />
                <div className="content-block">
                    .
                </div>
                <div className="footer">
                    .
                </div>
            </div>
        );
    }
}

App.propTypes = {
    tool: PropTypes.string,
    switchTool: PropTypes.func.isRequired,
};

App.defaultProps = {
    tool: '',
};

const mapStateToProps = state => ({
    tool: state.workshop.tool,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ switchTool }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
