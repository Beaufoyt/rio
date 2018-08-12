import types from '../constants/actionTypes';

export const globalLoader = isLoading => ({ type: types.GLOBAL_LOADER, isLoading });
