import React from 'react';

import FooterLinkColumn from './FooterLinkColumn';

import footerLinks from '../constants/footerLinks';

const Footer = () => {
    const mapFooterLinkColumns = () => {
        return Object.keys(footerLinks).map((key) => {
            return <FooterLinkColumn key={key} itemList={footerLinks[key]} title={key} />;
        });
    };

    return (
        <div className="footer">
            <div className="container footer-container">
                <div className="row">
                    <div className="col-sm">
                        <a href="/">
                            <h1>
                                {'Rio\'s Den'}
                            </h1>
                            <p>
                            Aromatherapy & Natural Cosmetic Recipes
                            </p>
                        </a>
                    </div>
                    {mapFooterLinkColumns()}
                </div>
                <hr />
                <h6 className="footer-copyright">
                © Rio 2018
                </h6>
            </div>
        </div>
    );
};

export default Footer;
