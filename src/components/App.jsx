import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchTool } from '../actions/workshop';

import PureComponent from './PureComponent';
import Header from './Header';
import Hero from './Hero';
import RecipesSection from './RecipesSection';
import LatestSection from './LatestSection';

class App extends PureComponent {
    setTool = (e) => {
        console.log('made it', e.target.name);
        this.props.switchTool('line');
    }

    isActive = (key) => {
        return key === this.props.tool;
    }

    render() {
        return (
            <div style={{ scrollBehavior: 'smooth' }}>
                <Header />
                <Hero />
                <RecipesSection />
                <LatestSection />
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
                            <div className="col-sm link-column">
                                <h5>Recipes</h5>
                                <ul>
                                    <li>
                                        <a href="/">Household Recipes</a>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <a href="/">Cosmetic Recipes</a>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <a href="/">Natural Remedies</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm link-column">
                                <h5>About</h5>
                                <ul>
                                    <li>
                                        <a href="/">Who we are</a>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <a href="/">Sources</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm link-column">
                                <h5>Contact</h5>
                                <ul>
                                    <li>
                                        <a href="/">Contact us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                        <h6 className="footer-copyright">
                            © Rio 2018
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    tool: PropTypes.string,
    switchTool: PropTypes.func.isRequired,
};

App.defaultProps = {
    tool: '',
};

const mapStateToProps = state => ({
    tool: state.workshop.tool,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ switchTool }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
