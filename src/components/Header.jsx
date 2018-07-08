import React from 'react';

import BrandLogo from './BrandLogo';
import NavLink from './NavLink';

const Header = () => {
    // componentDidMount() {
    //     this.toggleHeaderBackground();
    //     window.addEventListener('scroll', this.handleScroll);
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    // }

    // getDocumentScrollOffset = () => {
    //     const doc = document.documentElement;
    //
    //     return {
    //         yOffset: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
    //         xOffset: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
    //     };
    // }

    // toggleHeaderBackground = () => {
    //     const header = document.getElementById('header');
    //     const { yOffset } = this.getDocumentScrollOffset();
    //
    //     if (document.location.pathname === '/') {
    //         if (yOffset >= 744 && !header.classList.contains('header-dark')) {
    //             header.classList.toggle('header-dark');
    //         } else if (yOffset < 744 && header.classList.contains('header-dark')) {
    //             header.classList.toggle('header-dark');
    //         }
    //     }
    // }
    //
    // handleScroll = () => {
    //     this.toggleHeaderBackground();
    // };

    return (
        <div>

            <div id="header" className="header header-dark" />
            <div className="header-content-holder">
                <BrandLogo />
                <div className="header-nav">
                    <NavLink text="Latest" path="/#latest" />
                    <NavLink text="Recipes" path="/recipes" />
                    <NavLink text="About" path="#" />
                    <NavLink text="Contact" path="#" />
                </div>
            </div>
        </div>
    );
};

export default Header;
