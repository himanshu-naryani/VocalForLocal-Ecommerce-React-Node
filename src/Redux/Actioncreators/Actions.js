import {
    LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAILURE, LOG_OUT, LOGIN,
    DELETE_ITEM_IN_CART, EDIT_ITEM_IN_CART, CHANGE_ADDRESS,
    ADD_TO_CART, UPDATE_ORDER_HISTORY
} from "../Actiontypes/Actiontypes";


export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST,
    }
}
export const googleLogin = (googleData) => {

    return ({
        type: LOGIN,
        payLoad: googleData
    })
}
export const loginSucess = (data) => {
    return {
        type: LOGIN_SUCESS,
        payLoad: data
    }
}
export const loginFailure = (err) => {
    return {
        type: LOGIN_FAILURE,
        payLoad: err
    }
}
export const logOut = () => {
    return {
        type: LOG_OUT,
    }
}

export const deleteItemInCart = (delObj) => {

    return {
        type: DELETE_ITEM_IN_CART,
        payload: delObj
    }
}

export const editItemInCart = (editObj) => {

    return {
        type: EDIT_ITEM_IN_CART,
        payload: editObj
    }
}

export const addItemInCart = (addObj) => {

    return {
        type: ADD_TO_CART,
        payload: addObj
    }
}


export const changeAddress = (editObj) => {

    return {
        type: CHANGE_ADDRESS,
        payload: editObj
    }
}


export const updateOrderHistory = (userOrderHistory) => {
    return {
        type: UPDATE_ORDER_HISTORY,
        payload: userOrderHistory
    }
}
