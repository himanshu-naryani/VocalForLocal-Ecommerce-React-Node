import { 
    SEND_PRODUCT_FOR_PAYMENT,
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY
} from '../Actiontypes/ProductInfoActionTypes';

const initialState = {
    productData: {},
    quantity: 1
}

const productInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_PRODUCT_FOR_PAYMENT:
            return {
                ...state,
                productData: action.payLoad
            }

        case INCREMENT_QUANTITY:
            return {
                ...state,
                quantity: action.payLoad + 1
            }

        case DECREMENT_QUANTITY:
            return {
                ...state,
                quantity: action.payLoad - 1
            }

        default:
            return state;
    }
}

export default productInfoReducer;