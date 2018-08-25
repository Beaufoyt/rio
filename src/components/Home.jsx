import React from 'react';

import scrollTop from '../helpers/scrollTop';

import PureComponent from './PureComponent';
import Hero from './Hero';
import LatestSection from './LatestSection';

class Home extends PureComponent {
    componentDidMount() {
        scrollTop();
    }

    render() {
        return (
            <div>
                <Hero />
                <LatestSection />
            </div>
        );
    }
}

export default Home;
