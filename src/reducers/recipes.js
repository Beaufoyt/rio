import types from '../constants/actionTypes';

import newState from '../helpers/newState';

const input = {
    searchResults: null,
    areLoading: false,
    error: null,
};

export default function recipes(state = input, action) {
    switch (action.type) {
    case types.RECIPE_SUCCESS: {
        return newState(state, { searchResults: action.results, areLoading: false, error: null });
    }

    case types.RECIPES_ARE_LOADING: {
        return newState(state, { areLoading: true });
    }

    default:
        return state;
    }
}