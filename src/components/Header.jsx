import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import recipes from '../constants/recipes';
import { setLanguage } from '../actions/language';
import classnames from '../helpers/classnames';

import BrandLogo from './BrandLogo';
import BrandTitle from './BrandTitle';
import NavLink from './NavLink';
import PureComponent from './PureComponent';
import Translator from './Translator';
import en from '../assets/united-kingdom.svg';
import fr from '../assets/france.svg';

class Header extends PureComponent {
    state = {
        mobileMenuActive: false,
    }

    getLatestPath = () => {
        const latestId = recipes.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })[0].id;

        return `/recipe/${latestId}`;
    }

    getLatestLink = () => {
        return (
            <NavLink path={this.getLatestPath()}>
                <Translator languageKey="latest" />
            </NavLink>
        );
    }

    getRecipesLink = () => {
        return (
            <NavLink path="/recipes">
                <Translator languageKey="recipes" />
            </NavLink>
        );
    }

    getInventoryLink = () => {
        return (
            <NavLink path="/inventory">
                <Translator languageKey="inventory" />
            </NavLink>
        );
    }

    closeMobileMenu = () => {
        this.setState({ mobileMenuActive: false });
    }

    handleChange = (e) => {
        this.props.setLanguage(e.currentTarget.name);
    }

    isLanguageActive = (language) => {
        return this.props.activeLanguage === language;
    }

    toggleMobileMenu = () => {
        this.setState({ mobileMenuActive: !this.state.mobileMenuActive });
    }

    render() {
        const { mobileMenuActive } = this.state;

        return (
            <div>
                { this.props.isGlobalLoading &&
                    <div className="global-loader" /> }
                <div id="header" className="header header-dark" />
                <div className="header-content-holder">
                    <BrandLogo />
                    <BrandTitle />
                    <div className="header-nav">
                        <div
                            className="btn-group language-switcher"
                            role="group"
                            aria-label="Basic example">
                            <button
                                type="button"
                                name="en"
                                onClick={this.handleChange}
                                className={classnames('btn btn-secondary', { active: this.isLanguageActive('en') })}>
                                <img src={en} alt="en" />
                            </button>
                            <button
                                type="button"
                                name="fr"
                                onClick={this.handleChange}
                                className={classnames('btn btn-secondary', { active: this.isLanguageActive('fr') })}>
                                <img src={fr} alt="fr" />
                            </button>
                        </div>
                        <span className="desktop-menu">
                            {this.getLatestLink()}
                            {this.getRecipesLink()}
                            {this.getInventoryLink()}
                        </span>
                        <button
                            type="button"
                            onClick={this.toggleMobileMenu}
                            className="btn btn-secondary btn-header-menu">
                            <i className={`fa fa-${mobileMenuActive ? 'times' : 'bars'}`} />
                        </button>
                        { mobileMenuActive &&
                            <div className="mobile-menu">
                                <div className="mobile-menu-link margin-top">
                                    <button onClick={this.closeMobileMenu}>
                                        {this.getLatestLink()}
                                    </button>
                                </div>
                                <div className="mobile-menu-link">
                                    <button onClick={this.closeMobileMenu}>
                                        {this.getRecipesLink()}
                                    </button>
                                </div>
                                <div className="mobile-menu-link margin-bottom">
                                    <button onClick={this.closeMobileMenu}>
                                        {this.getInventoryLink()}
                                    </button>
                                </div>
                            </div> }
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    isGlobalLoading: PropTypes.bool.isRequired,
    setLanguage: PropTypes.func.isRequired,
    activeLanguage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    isGlobalLoading: state.ui.globalLoading,
    activeLanguage: state.language.activeLanguage,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setLanguage,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
