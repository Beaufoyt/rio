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
