import React from 'react';

import Leaf from '../assets/leaf.svg';

const BrandLogo = () => {
    return (
        <a href="/" className="brand-logo">
            <img src={Leaf} alt="brand" />
        </a>
    );
};

export default BrandLogo;
