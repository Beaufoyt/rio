import React from 'react';

import BrandLogo from './BrandLogo';
import BrandTitle from './BrandTitle';

const Footer = () => {
    return (
        <div className="footer">
            <BrandTitle />
            <p>Aromatherapy & Natural Cosmetic Recipes</p>
            <hr />
            <BrandLogo />
            <h6>© Rio 2018</h6>
        </div>
    );
};

export default Footer;
