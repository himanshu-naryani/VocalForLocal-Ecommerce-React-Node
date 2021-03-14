import { UPDATE_ORDER_CANCEL } from '../Actiontypes/CancelOrderActionTypes';

export const updateOrderDataAction = (data) => {

    return {
        type: UPDATE_ORDER_CANCEL,
        payload: data
    }
}