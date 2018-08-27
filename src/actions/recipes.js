import axios from 'axios';

import { globalLoader } from './ui';
import types from '../constants/actionTypes';
import recipes from '../constants/recipes';
import config from '../config';

export const addToCount = amount => ({ type: types.NUMBER_COUNTER_ADD, amount });

// const recipeError = () => ({ type: types.RECIPES_ERROR });
const recipeSuccess = results => ({ type: types.RECIPE_SUCCESS, results });
const recipesAreLoading = (searchString, categoryId) => ({ type: types.RECIPES_ARE_LOADING, searchString, categoryId });

export function searchRecipes(searchString, categoryId, globalLoaderEnabled = false) {
    const searchResults = [];
    const sanitizedSearchString = searchString.trim().toLowerCase();
    const parsedCategoryId = parseInt(categoryId, 10);

    return (dispatch) => {
        dispatch(recipesAreLoading(searchString, categoryId));

        if (globalLoaderEnabled) {
            dispatch(globalLoader(true));
        }

        recipes.forEach((recipe) => {
            if (!parsedCategoryId || parsedCategoryId === recipe.categoryId) {
                if (recipe.title.toLowerCase().includes(sanitizedSearchString) ||
                (recipe.description && recipe.description.toLowerCase().includes(sanitizedSearchString)) ||
                (recipe.ingredients &&
                    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(sanitizedSearchString))) ||
                    (recipe.steps && recipe.steps.some(step => step.toLowerCase().includes(sanitizedSearchString))) ||
                    (recipe.tags && recipe.tags.some(tag => tag.text.toLowerCase().includes(sanitizedSearchString)))) {
                    searchResults.push(recipe);
                }
            }
        });

        setTimeout(() => {
            dispatch(recipeSuccess(searchResults));

            if (globalLoaderEnabled) {
                dispatch(globalLoader(false));
            }
        }, 3000);
    };
}

const fetchCategoriesSuccess = categories => ({ type: types.FETCH_CATEGORIES_SUCCESS, categories });
const fetchCategoriesIsLoading = isLoading => ({ type: types.FETCH_CATEGORIES_IS_LOADING, isLoading });

export function fetchCategories() {
    return async (dispatch) => {
        dispatch(fetchCategoriesIsLoading(true));

        try {
            const response = await axios.get(`${config.baseApi}/categories`);
            dispatch(fetchCategoriesSuccess(response.data));
        } catch (err) {
            dispatch(fetchCategoriesIsLoading(false));
        }
    };
}
