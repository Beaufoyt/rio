import { combineReducers } from 'redux';

import recipes from './recipes';
import ui from './ui';

export default combineReducers({
    recipes,
    ui,
});
