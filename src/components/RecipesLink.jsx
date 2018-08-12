import React from 'react';
import PropTypes from 'prop-types';

import PureComponent from './PureComponent';

class RecipesLink extends PureComponent {
    handleClick = () => {
        this.props.onClick(this.props.name);
    }

    render() {
        return (
            <button
                onClick={this.handleClick}
                className="content-block-content recipe-link margin-bottom">
                <img alt="recipe" src={this.props.img} />
                <span>{this.props.text}</span>
            </button>
        );
    }
}

RecipesLink.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    img: PropTypes.string.isRequired,
};

export default RecipesLink;
