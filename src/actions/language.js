import types from '../constants/actionTypes';
import localStorage from '../helpers/localStorage';

export const setLanguage = (language) => {
    localStorage.set('language', language);
    return { type: types.SET_LANGUAGE, language };
};
