import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import dictionary from '../constants/dictionary';

const Translator = (props) => {
    return (dictionary[`${props.languageKey}-${props.activeLanguage}`]);
};

Translator.propTypes = {
    languageKey: PropTypes.string.isRequired,
    activeLanguage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    activeLanguage: state.language.activeLanguage,
});

export default connect(mapStateToProps, null)(Translator);
