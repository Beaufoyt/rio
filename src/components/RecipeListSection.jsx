import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import scrollTop from '../helpers/scrollTop';

import PureComponent from './PureComponent';

class Recipes extends PureComponent {
    componentDidMount() {
        scrollTop();
    }

    render() {
        return (
            <div>
                <div className="recipe-list-section">
                    <h4>{_.startCase(this.props.title)}</h4>
                    <ul>
                        {
                            this.props.itemList.map((item) => {
                                return (
                                    <li key={item.text}>
                                        <Link to={item.id ? `/recipe/${item.id}` : ''} href="/">
                                            {item.text}
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <hr />
            </div>
        );
    }
}

Recipes.propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        id: PropTypes.number,
    })),
    title: PropTypes.string.isRequired,
};

Recipes.defaultProps = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
        text: '',
        id: null,
    })),
};

export default Recipes;
