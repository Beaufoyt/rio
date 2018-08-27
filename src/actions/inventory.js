import axios from 'axios';

import { globalLoader } from './ui';
import { queryParam } from '../helpers/query';
import types from '../constants/actionTypes';
import config from '../config';

const fetchInventorySuccess = inventory => ({ type: types.FETCH_INVENTORY_SUCCESS, inventory });
const fetchInventoryIsLoading = isLoading => ({ type: types.FETCH_INVENTORY_IS_LOADING, isLoading });

export function fetchInventory(categoryId) {
    return async (dispatch) => {
        const queryString = categoryId !== undefined ? queryParam('categoryId', categoryId, true) : '';
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
