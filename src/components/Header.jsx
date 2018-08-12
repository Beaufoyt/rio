import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import recipes from '../constants/recipes';

import BrandLogo from './BrandLogo';
import NavLink from './NavLink';
import PureComponent from './PureComponent';

class Header extends PureComponent {
    getLatestLink = () => {
        const latestId = recipes.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })[0].id;

        return `/recipe/${latestId}`;
    }

    render() {
        return (
            <div>
                { this.props.isGlobalLoading &&
                    <div className="global-loader" /> }
                <div id="header" className="header header-dark" />
                <div className="header-content-holder">
                    <BrandLogo />
                    <div className="header-nav">
                        <NavLink text="Latest" path={this.getLatestLink()} />
                        <NavLink text="Recipes" path="/recipes" />
                        <NavLink text="About" path="#" />
                        <NavLink text="Contact" path="#" />
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    isGlobalLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isGlobalLoading: state.ui.globalLoading,
});

export default connect(mapStateToProps, null)(Header);
