import {SEND_PRODUCT_FOR_PAYMENT, INCREMENT_QUANTITY, DECREMENT_QUANTITY} from '../Actiontypes/ProductInfoActionTypes';

export const sendProductDataForPayment = (productData) => {
    return {
        type: SEND_PRODUCT_FOR_PAYMENT,
        payLoad: productData
    }
}

export const incrementQuantity = (quantity) => {
    return {
        type: INCREMENT_QUANTITY,
        payLoad: quantity
    }
} 

export const decrementQuantity = (quantity) => {
    return {
        type: DECREMENT_QUANTITY,
        payLoad: quantity
    }
} 