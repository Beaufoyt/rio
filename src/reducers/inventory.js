import types from '../constants/actionTypes';

import newState from '../helpers/newState';

const input = {
    inventory: null,
    fetchIsLoading: false,
    searchIsLoading: false,
    toggleStockIsLoading: false,
    toggleId: null,
};

export default function recipes(state = input, action) {
    switch (action.type) {
    case types.FETCH_INVENTORY_IS_LOADING: {
        return newState(state, { fetchIsLoading: action.isLoading });
    }
    case types.FETCH_INVENTORY_SUCCESS: {
        return newState(state, { fetchIsLoading: false, inventory: action.inventory });
    }

    case types.SEARCH_INVENTORY_IS_LOADING: {
        return newState(state, { searchIsLoading: action.isLoading });
    }
    case types.SEARCH_INVENTORY_SUCCESS: {
        return newState(state, { searchIsLoading: false, inventory: action.inventory });
    }

    case types.TOGGLE_STOCK_IS_LOADING: {
        return newState(state, { toggleStockIsLoading: action.isLoading, toggleId: action.id });
    }
    case types.TOGGLE_STOCK_SUCCESS: {
        return newState(state, {
            toggleStockIsLoading: false,
            toggleId: null,
            inventory: state.inventory.map(inventoryItem =>
                (inventoryItem.id === action.newItem.id ?
                    Object.assign({}, inventoryItem, { inStock: Number(action.newItem.inStock) }) :
                    inventoryItem)),
        });
    }

    default:
        return state;
    }
}
