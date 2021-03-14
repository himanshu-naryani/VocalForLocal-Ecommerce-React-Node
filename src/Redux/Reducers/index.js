import { combineReducers } from 'redux'
import AdminReducer from './AdminReducer'
import { UnApprovedProductsReducer } from '../Reducers/UnApprovedProductsReducer'
import signinreducer from './SigninReducer';
import profileReducer from './UpdateProfileReducer';

import orderReducer from './UpdateOrderCancelReducer';

import productInfoReducer from './ProductInfoReducer';
import SubTotalReducer from './SubTotalReducer'

export const RootReducer = combineReducers({
    adminReducer: AdminReducer,
    unApprovedProducts: UnApprovedProductsReducer,
    signin: signinreducer,
    updateProfile: profileReducer,
    productInfo: productInfoReducer,
    subTotal: SubTotalReducer,

    updateOrder: orderReducer
})

export default RootReducer;
