import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const RecipeListSection = (props) => {
    return (
        <div>
            <div id={props.id} className="recipe-list-section">
                <h4>{_.startCase(props.title)}</h4>
                <ul>
                    {
                        props.itemList.map((item) => {
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
};

RecipeListSection.propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        id: PropTypes.number,
    })),
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

RecipeListSection.defaultProps = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
        text: '',
        id: null,
    })),
};

export default RecipeListSection;
