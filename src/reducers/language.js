import types from '../constants/actionTypes';

import newState from '../helpers/newState';

const input = {
    activeLanguage: 'en',
};

export default function language(state = input, action) {
    switch (action.type) {
    case types.SET_LANGUAGE: {
        return newState(state, { activeLanguage: action.language });
    }

    default:
        return state;
    }
}
