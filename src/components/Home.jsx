import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchTool } from '../actions/workshop';

import PureComponent from './PureComponent';
import Hero from './Hero';
import RecipesSection from './RecipesSection';
import LatestSection from './LatestSection';

class Home extends PureComponent {
    setTool = (e) => {
        console.log('made it', e.target.name);
        this.props.switchTool('line');
    }

    isActive = (key) => {
        return key === this.props.tool;
    }

    render() {
        return (
            <div style={{ scrollBehavior: 'smooth' }}>
                <Hero />
                <RecipesSection />
                <LatestSection />

            </div>
        );
    }
}

Home.propTypes = {
    tool: PropTypes.string,
    switchTool: PropTypes.func.isRequired,
};

Home.defaultProps = {
    tool: '',
};

const mapStateToProps = state => ({
    tool: state.workshop.tool,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ switchTool }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
