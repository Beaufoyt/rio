import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchTool } from '../actions/workshop';

import PureComponent from './PureComponent';

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
            <div className="sidebar">
                <button
                    name="line"
                    onClick={this.setTool}
                    className={`btn btn-success ${this.isActive('line') ? 'active' : ''}`}>
                    Line
                </button>
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
