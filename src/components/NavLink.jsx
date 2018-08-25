import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
    return (
        <Link className="header-nav-link" href={props.path} to={props.path}>
            {props.children}
        </Link>
    );
};

NavLink.propTypes = {
    children: PropTypes.element,
    path: PropTypes.string.isRequired,
};

NavLink.defaultProps = {
    children: null,
};

export default NavLink;
