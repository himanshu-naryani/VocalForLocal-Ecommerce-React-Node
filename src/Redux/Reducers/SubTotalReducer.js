import {Types} from '../Actiontypes/SubTotalActionType'

const initial_state = {

}

const SubTotalReducer = (state = initial_state, action) => {

    switch (action.type) {
       case Types.SUB_TOTAL:
          return {...state, [action.productId]:action.payload};
      case Types.DELETE_ITEM_FROM_SUBTOTAL:
         return action.payload
      case Types.EMPTY_THE_SUBTOTAL:
         return initial_state   
       default:
          return {...state};
     }
  };
  export default SubTotalReducer;

