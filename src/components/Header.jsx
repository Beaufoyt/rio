import React from 'react';

import BrandLogo from './BrandLogo';
import NavLink from './NavLink';
import PureComponent from './PureComponent';

class Header extends PureComponent {
    componentDidMount() {
        this.toggleHeaderBackground();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    getDocumentScrollOffset = () => {
        const doc = document.documentElement;

        return {
            yOffset: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
            xOffset: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
        };
    }

    toggleHeaderBackground = () => {
        const header = document.getElementById('header');
        const { yOffset } = this.getDocumentScrollOffset();

        if (document.location.pathname === '/') {
            if (yOffset >= 744 && !header.classList.contains('header-dark')) {
                header.classList.toggle('header-dark');
            } else if (yOffset < 744 && header.classList.contains('header-dark')) {
                header.classList.toggle('header-dark');
            }
        }
    }

    handleScroll = () => {
        this.toggleHeaderBackground();
    };

    render() {
        return (
            <div id="header" className="header">
                <div className="header-content-holder">
                    <BrandLogo />
                    <NavLink text="Latest" path="/#latest" />
                    <NavLink text="Recipes" path="/recipes" />
                    <NavLink text="About" path="#" />
                    <NavLink text="Contact" path="#" />
                </div>
            </div>
        );
    }
}

export default Header;
