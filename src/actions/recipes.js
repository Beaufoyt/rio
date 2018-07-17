import types from '../constants/actionTypes';

export const addToCount = amount => ({ type: types.NUMBER_COUNTER_ADD, amount });

// const recipeError = () => ({ type: types.RECIPES_ERROR });
const recipeSuccess = results => ({ type: types.RECIPE_SUCCESS, results });
const recipesAreLoading = () => ({ type: types.RECIPES_ARE_LOADING });

export function searchRecipes() {
    return (dispatch) => {
        dispatch(recipesAreLoading());

        setTimeout(() => {
            dispatch(recipeSuccess([]));
        }, 3000);
    };
}
