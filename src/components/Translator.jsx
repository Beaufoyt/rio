import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import translator from '../helpers/translator';

const Translator = (props) => {
    return (translator(props.languageKey, props.activeLanguage));
};

Translator.propTypes = {
    languageKey: PropTypes.string.isRequired,
    activeLanguage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    activeLanguage: state.language.activeLanguage,
});

export default connect(mapStateToProps, null)(Translator);
