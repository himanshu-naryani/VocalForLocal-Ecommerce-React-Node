import {UPDATE_USER_DATA} from '../Actiontypes/UpdateProfileActionTypes';

export const updateUserDataAction = (data) => {

    return {
        type: UPDATE_USER_DATA,
        payLoad: data
    }
}