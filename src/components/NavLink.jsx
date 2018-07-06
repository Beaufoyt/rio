import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <a className="header-nav-link" href={props.path}>
            {props.text}
        </a>
    );
};

Header.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default Header;
