import {Types} from '../Actiontypes/UnApprovedProductsTypes'

export const getUnApprovedProducts = ()=>({
    type : Types.GetProducts
})

export const productsAction = (response) =>({
    type : Types.Products,
    payload : response
})

export const  approveProduct = (id) =>({
type : Types.Approve,
payload : id
})