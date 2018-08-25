import { combineReducers } from 'redux';

import inventory from './inventory';
import language from './language';
import recipes from './recipes';
import ui from './ui';

export default combineReducers({
    inventory,
    language,
    recipes,
    ui,
});
