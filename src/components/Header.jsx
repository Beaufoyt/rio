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
import en from '../assets/united-kingdom.svg';
import fr from '../assets/france.svg';

class Header extends PureComponent {
    getLatestLink = () => {
        const latestId = recipes.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })[0].id;

        return `/recipe/${latestId}`;
    }

    handleChange = (e) => {
        this.props.setLanguage(e.currentTarget.name);
    }

    isLanguageActive = (language) => {
        return this.props.activeLanguage === language;
    }

    render() {
        return (
            <div>
                { this.props.isGlobalLoading &&
                    <div className="global-loader" /> }
                <div id="header" className="header header-dark" />
                <div className="header-content-holder">
                    <BrandLogo />
                    <BrandTitle />
                    <div className="header-nav">
                        <div name="hello" className="btn-group language-switcher" role="group" aria-label="Basic example">
                            <button type="button" name="en" onClick={this.handleChange} className={classnames('btn btn-secondary', { active: this.isLanguageActive('en') })}><img src={en} alt="en" /></button>
                            <button type="button" name="fr" onClick={this.handleChange} className={classnames('btn btn-secondary', { active: this.isLanguageActive('fr') })}><img src={fr} alt="fr" /></button>
                        </div>
                        <NavLink text="Latest" path={this.getLatestLink()} />
                        <NavLink text="Recipes" path="/recipes" />
                        <NavLink text="Inventory" path="/inventory" />
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
