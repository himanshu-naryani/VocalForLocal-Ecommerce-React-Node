import {Types} from '../Actiontypes/AdminActionTypes'

export const makeAdmin = (email) => ({
    type: Types.Transfer,
    payload:email
});

export const AdminMade = (response) =>{
    return ({
    type: Types.AdminMade,
    payload :response.data.message
})

}