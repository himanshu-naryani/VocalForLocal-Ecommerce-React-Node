import {Types} from '../Actiontypes/SubTotalActionType'

export const subTotal = (id , data) => ({
    type: Types.SUB_TOTAL,
    productId:id,
    payload : data
});

export const updateSubtotal = (data) => ({
    type: Types.DELETE_ITEM_FROM_SUBTOTAL,
    payload : data
});

export const emptySubtotal = ()=>({
    type : Types.EMPTY_THE_SUBTOTAL
})