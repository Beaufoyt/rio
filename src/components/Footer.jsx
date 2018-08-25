import React from 'react';

import BrandLogo from './BrandLogo';
import BrandTitle from './BrandTitle';
import Translator from './Translator';

const Footer = () => {
    return (
        <div className="footer">
            <BrandTitle />
            <p><Translator languageKey="strapline" /></p>
            <hr />
            <BrandLogo />
            <h6>© Rio 2018</h6>
        </div>
    );
};

export default Footer;
