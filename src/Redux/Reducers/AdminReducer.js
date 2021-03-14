import { Types } from '../Actiontypes/AdminActionTypes'

const initial_state = {
    loading: false,
    data: {}
}

const AdminReducer = (state = initial_state, action) => {

    switch (action.type) {
        case Types.Transfer:
            return { ...state, loading: true };
        case Types.AdminMade:
            return { ...state, loading: false, data: action.payload }
        default:
            return { ...state, loading: false };
    }
};
export default AdminReducer;

