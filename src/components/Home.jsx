import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchTool } from '../actions/workshop';
import scrollToAnchor from '../helpers/scrollToAnchor';

import PureComponent from './PureComponent';
import Hero from './Hero';
import RecipesSection from './RecipesSection';
import LatestSection from './LatestSection';

const headerHeight = 56;

class Home extends PureComponent {
    componentDidMount() {
        scrollToAnchor(this.props.location, { x: 0, y: -headerHeight });
    }

    componentDidUpdate() {
        scrollToAnchor(this.props.location, { x: 0, y: -headerHeight });
    }

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
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
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
