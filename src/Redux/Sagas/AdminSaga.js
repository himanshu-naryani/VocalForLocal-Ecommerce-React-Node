import {Types} from '../Actiontypes/AdminActionTypes'
import { put , call, takeLatest} from 'redux-saga/effects';
import {makeAdminApi} from '../Apis/AdminApis'
import {AdminMade} from '../Actioncreators/AdminActions'

function* makeANewAdmin(action) {
       try {  
          const data = yield call (makeAdminApi , action.payload)
          yield put(AdminMade(data));
        }
        catch{
          const failue = {
            data:{
              message:"Email ID does not exists"
            }
          }
          yield put(AdminMade(failue));
        }
}

export function* adminActionWatcher() {
     yield takeLatest(Types.Transfer, makeANewAdmin)
}


