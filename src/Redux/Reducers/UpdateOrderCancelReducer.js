import { UPDATE_ORDER_CANCEL } from "../Actiontypes/CancelOrderActionTypes";


const initialState = {
    data: {}
}

const orderReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_ORDER_CANCEL:
            return { ...state, data: action.payload }

        default:
            return state;
    }
}

export default orderReducer;


