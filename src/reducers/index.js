import { combineReducers } from 'redux';

import language from './language';
import recipes from './recipes';
import ui from './ui';

export default combineReducers({
    language,
    recipes,
    ui,
});
