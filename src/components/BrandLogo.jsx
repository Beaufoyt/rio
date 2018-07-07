import React from 'react';

import Leaf from '../assets/leaf.svg';

const Header = () => {
    return (
        <a href="/" className="brand-logo">
            <img src={Leaf} alt="brand" />
            <span>
                {'Rio\'s Den'}
            </span>
        </a>
    );
};

export default Header;
