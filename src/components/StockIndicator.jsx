import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleStock } from '../actions/inventory';
import classnames from '../helpers/classnames';

import PureComponent from './PureComponent';
import Translator from './Translator';

class StockIndicator extends PureComponent {
    getToggleProps = (canToggle, id) => {
        return canToggle ?
            {
                id,
                tabIndex: -2,
                onClick: this.handleToggle,
                onKeyUp: this.handleEnter,
                role: 'button',
            } :
            {};
    }

    handleEnter = (e) => {
        if (e.keyCode === 13) {
            this.handleToggle(e);
        }
    }

    handleToggle = (e) => {
        e.stopPropagation();

        this.props.toggleStock(e.currentTarget.id);
    }

    render() {
        const {
            color, icon, languageKey, id, toggleStockIsLoading, canToggle, toggleId,
        } = this.props;

        return (
            <div
                className={classnames('stock-indicator', { toggleable: canToggle })}>
                <span {...this.getToggleProps(canToggle, id)}>
                    <h5 style={{ color }}>
                        <i className={`fa fa-${toggleId === id && toggleStockIsLoading ? 'spinner fa-spin' : icon}`} />
                        <Translator languageKey={languageKey} />
                    </h5>
                </span>
            </div>
        );
    }
}

StockIndicator.propTypes = {
    icon: PropTypes.string.isRequired,
    languageKey: PropTypes.string.isRequired,
    toggleStock: PropTypes.func.isRequired,
    toggleStockIsLoading: PropTypes.bool.isRequired,
    color: PropTypes.string,
    id: PropTypes.number,
    toggleId: PropTypes.number,
    canToggle: PropTypes.bool,
};

StockIndicator.defaultProps = {
    canToggle: false,
    color: 'black',
    id: 0,
    toggleId: null,
};

const mapStateToProps = state => ({
    toggleStockIsLoading: state.inventory.toggleStockIsLoading,
    toggleId: state.inventory.toggleId,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleStock }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StockIndicator);
