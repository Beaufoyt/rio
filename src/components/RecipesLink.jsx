import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <a href={props.path} className="content-block-content">
            <img alt="recipe-link margin-bottom" src={props.img} />
            <span>{props.text}</span>
        </a>
    );
};

Header.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default Header;
