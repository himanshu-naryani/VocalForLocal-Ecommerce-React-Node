import actions from "redux-form/lib/actions";
import AddToCart from "../../Components/CartPage/AddToCart";
import {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  LOGIN,
  DELETE_ITEM_IN_CART,
  EDIT_ITEM_IN_CART,
  CHANGE_ADDRESS,
  ADD_TO_CART,
  UPDATE_ORDER_HISTORY
} from "../Actiontypes/Actiontypes";
import { UPDATE_USER_DATA } from "../Actiontypes/UpdateProfileActionTypes";

const initailState = {
  loading: false,
  data: {},
  err: null,
  message: "",
  googleData: false,
};
const Reducer = (state = initailState, action) => {

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        data: action.payLoad,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        err: action.payLoad,
        loading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        data: { data: undefined },
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        data: action.payLoad,
      };
    case LOGIN:
      return {
        ...state,
        googleData: action.payLoad,
      };
    case UPDATE_ORDER_HISTORY:
      return {
        ...state,
        data: {
          ...state.data,
          data: {
            ...state.data.data,
            userdata: {
              ...state.data.data.userdata,
              userOrderHistory: action.payload
            }
          }
        }
      }
    case DELETE_ITEM_IN_CART:
      return {
        ...state,
        data: {
          ...state.data,
          data: {
            ...state.data.data,
            userdata: {
              ...state.data.data.userdata,
              userCart: action.payload
            }
          }
        }
      }


    case EDIT_ITEM_IN_CART:
      return {
        ...state,
        data: {
          ...state.data,
          data: {
            ...state.data.data,
            userdata: {
              ...state.data.data.userdata,
              userCart: action.payload
            }
          }
        }
      }
    case CHANGE_ADDRESS:
      return {
        ...state,
        data: {
          ...state.data,
          data: {
            ...state.data.data,
            userdata: {
              ...state.data.data.userdata,
              userAddress: action.payload
            }
          }
        }
      }
    case ADD_TO_CART:
      return {
        ...state,
        data: {
          ...state.data,
          data: {
            ...state.data.data,
            userdata: {
              ...state.data.data.userdata,
              userCart: action.payload
            }
          }
        }
      }

    default:

      return state
  }
};
export default Reducer;




