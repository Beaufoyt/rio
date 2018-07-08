import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const FooterLinkColumn = (props) => {
    return (
        <div className="col-sm link-column">
            <h4>{_.startCase(props.title)}</h4>
            <ul>
                {
                    props.itemList.map((item) => {
                        return (
                            <li key={item.text}>
                                <Link to={item.path} href={item.path}>
                                    {item.text}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

FooterLinkColumn.propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        path: PropTypes.string,
    })),
    title: PropTypes.string.isRequired,
};

FooterLinkColumn.defaultProps = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
        text: '',
        path: '/',
    })),
};

export default FooterLinkColumn;
