import React from 'react';

const Header = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <h2>Aromatherapy & Natural Cosmetic Recipes</h2>
                <form className="form-search">
                    <input placeholder="Enter recipe here" className="" type="text" />
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    );
};

export default Header;
