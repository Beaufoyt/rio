import types from '../constants/actionTypes';

import newState from '../helpers/newState';

const input = {
    globalLoading: false,
};

export default function ui(state = input, action) {
    switch (action.type) {
    case types.GLOBAL_LOADER: {
        return newState(state, { globalLoading: action.isLoading });
    }

    default:
        return state;
    }
}
