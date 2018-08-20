import types from '../constants/actionTypes';

import newState from '../helpers/newState';

const input = {
    searchResults: null,
    areLoading: false,
    error: null,
    searchString: '',
    categoryId: null,
    fetchCategoriesIsLoading: false,
    categories: null,
};

export default function recipes(state = input, action) {
    switch (action.type) {
    case types.RECIPE_SUCCESS: {
        return newState(state, { searchResults: action.results, areLoading: false, error: null });
    }
    case types.RECIPES_ARE_LOADING: {
        return newState(state, { areLoading: true, searchString: action.searchString, categoryId: action.categoryId });
    }

    case types.FETCH_CATEGORIES_SUCCESS: {
        return newState(state, { categories: action.categories, fetchCategoriesIsLoading: false });
    }
    case types.FETCH_CATEGORIES_IS_LOADING: {
        return newState(state, { fetchCategoriesIsLoading: true });
    }

    default:
        return state;
    }
}
