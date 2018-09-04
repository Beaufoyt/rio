import axios from 'axios';

import { globalLoader } from './ui';
import { queryBuilder } from '../helpers/query';
import types from '../constants/actionTypes';
import config from '../config';

const fetchInventorySuccess = inventory => ({ type: types.FETCH_INVENTORY_SUCCESS, inventory });
const fetchInventoryIsLoading = isLoading => ({ type: types.FETCH_INVENTORY_IS_LOADING, isLoading });

export function fetchInventory(categoryId) {
    return async (dispatch) => {
        const queryString = categoryId !== undefined ? `?categoryId=${categoryId}` : '';
        dispatch(fetchInventoryIsLoading(true));
        dispatch(globalLoader(true));

        try {
            const response = await axios.get(`${config.baseApi}/inventory${queryString}`);
            dispatch(fetchInventorySuccess(response.data));
            dispatch(globalLoader(false));
        } catch (err) {
            dispatch(fetchInventoryIsLoading(false));
        }
    };
}

const searchInventorySuccess = inventory => ({ type: types.SEARCH_INVENTORY_SUCCESS, inventory });
const searchInventoryIsLoading = isLoading => ({ type: types.SEARCH_INVENTORY_IS_LOADING, isLoading });

export function searchInventory(searchString, language, categoryId) {
    return async (dispatch) => {
        const newCategoryId = Number(categoryId) === 0 ? undefined : categoryId;
        const queryString = queryBuilder({ q: searchString, lang: language, categoryId: newCategoryId });
        dispatch(searchInventoryIsLoading(true));

        try {
            const response = await axios.get(`${config.baseApi}/inventory/search${queryString}`);
            console.log('action', response.data);
            dispatch(searchInventorySuccess(response.data));
        } catch (err) {
            dispatch(searchInventoryIsLoading(false));
        }
    };
}

const toggleStockSuccess = newItem => ({ type: types.TOGGLE_STOCK_SUCCESS, newItem });
const toggleStockIsLoading = (isLoading, id) => ({ type: types.TOGGLE_STOCK_IS_LOADING, isLoading, id });

export function toggleStock(inventoryId) {
    return async (dispatch) => {
        dispatch(toggleStockIsLoading(true, parseInt(inventoryId, 10)));

        try {
            const response = await axios.put(`${config.baseApi}/inventory/toggle-stock/${inventoryId}`);
            dispatch(toggleStockSuccess(response.data));
        } catch (err) {
            dispatch(toggleStockIsLoading(false, null));
        }
    };
}
