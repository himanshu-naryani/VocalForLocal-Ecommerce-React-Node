import {Types} from '../Actiontypes/UnApprovedProductsTypes'

const initial_state = {
    loading:false,
    products:{}
}

export const UnApprovedProductsReducer = (state=initial_state , action)=>{
    switch(action.type){
        case Types.GetProducts:
            return {...state , loading:true}
        case Types.Products:
            return {...state , loading:false , products:action.payload}
        case Types.Approve:
            return {...state , products : state.products.filter((product) => product.productId !== action.payload)}    
        default:
            return {...state, message:"Some error with actions" }    
    }
}