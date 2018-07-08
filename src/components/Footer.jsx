import React from 'react';

const Footer = () => {
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
    );
};

export default Footer;
