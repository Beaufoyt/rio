import types from '../constants/actionTypes';

import newState from '../helpers/newState';

const input = {
    tool: null,
};

export default function sidebar(state = input, action) {
    switch (action.type) {
    case types.SWITCH_TOOL: {
        return newState(state, { tool: action.tool });
    }

    default:
        return state;
    }
}
