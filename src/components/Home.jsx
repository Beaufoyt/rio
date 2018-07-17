import React from 'react';
import PropTypes from 'prop-types';

import scrollToAnchor from '../helpers/scrollToAnchor';
import scrollTop from '../helpers/scrollTop';
import { headerHeight } from '../constants/dimensions';

import PureComponent from './PureComponent';
import Hero from './Hero';
import RecipesSection from './RecipesSection';
import LatestSection from './LatestSection';

class Home extends PureComponent {
    componentDidMount() {
        scrollTop();
        scrollToAnchor(this.props.location, { x: 0, y: -headerHeight });
    }

    componentDidUpdate() {
        scrollToAnchor(this.props.location, { x: 0, y: -headerHeight });
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
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default Home;
