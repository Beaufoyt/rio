import dictionary from '../constants/dictionary';

const translator = (languageKey, activeLanguage) => {
    return dictionary[`${languageKey}-${activeLanguage}`];
};

export default translator;
