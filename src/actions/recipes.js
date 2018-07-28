import types from '../constants/actionTypes';
import recipes from '../constants/recipes';

export const addToCount = amount => ({ type: types.NUMBER_COUNTER_ADD, amount });

// const recipeError = () => ({ type: types.RECIPES_ERROR });
const recipeSuccess = results => ({ type: types.RECIPE_SUCCESS, results });
const recipesAreLoading = searchString => ({ type: types.RECIPES_ARE_LOADING, searchString });

export function searchRecipes(searchString) {
    const searchResults = [];
    const sanitizedSearchString = searchString.trim().toLowerCase();

    return (dispatch) => {
        dispatch(recipesAreLoading(searchString));

        recipes.forEach((recipe) => {
            if (recipe.title.toLowerCase().includes(sanitizedSearchString) ||
                (recipe.description && recipe.description.toLowerCase().includes(sanitizedSearchString)) ||
                (recipe.ingredients &&
                    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(sanitizedSearchString))) ||
                (recipe.steps && recipe.steps.some(step => step.toLowerCase().includes(sanitizedSearchString))) ||
                (recipe.tags && recipe.tags.some(tag => tag.text.toLowerCase().includes(sanitizedSearchString)))) {
                searchResults.push(recipe);
            }
        });

        setTimeout(() => {
            dispatch(recipeSuccess(searchResults));
        }, 3000);
    };
}
