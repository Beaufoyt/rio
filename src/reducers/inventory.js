import types from '../constants/actionTypes';

import newState from '../helpers/newState';

const input = {
    inventory: null,
    fetchIsLoading: false,
};

export default function recipes(state = input, action) {
    switch (action.type) {
    case types.FETCH_INVENTORY_IS_LOADING: {
        return newState(state, { fetchIsLoading: action.isLoading });
    }
    case types.FETCH_INVENTORY_SUCCESS: {
        return newState(state, { fetchIsLoading: false, inventory: action.inventory });
    }

    default:
        return state;
    }
}
