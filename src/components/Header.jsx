import React from 'react';

import BrandLogo from './BrandLogo';
import NavLink from './NavLink';
import PureComponent from './PureComponent';

class Header extends PureComponent {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    nav = React.createRef();

    handleScroll = () => {
        const testDiv = document.getElementById('header');
        console.log(testDiv.offsetTop);
    };

    render() {
        return (
            <div id="header" className="header">
                <div className="header-content-holder">
                    <BrandLogo />
                    <NavLink text="Latest" path="#" />
                    <NavLink text="Recipes" path="#" />
                    <NavLink text="About" path="#" />
                    <NavLink text="Contact" path="#" />
                </div>
            </div>
        );
    }
}

export default Header;
