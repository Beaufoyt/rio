import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
    return (
        <Link className="header-nav-link" href={props.path} to={props.path}>
            {props.text}
        </Link>
    );
};

NavLink.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default NavLink;
