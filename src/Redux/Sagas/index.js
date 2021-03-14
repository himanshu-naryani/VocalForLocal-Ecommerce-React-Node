import { all } from 'redux-saga/effects'
import { adminActionWatcher } from './AdminSaga'
import { UnApprovedProductsActionWatcher } from './UnApprovedProductsSaga'


function* RootSaga() {

    yield all([
        adminActionWatcher(),
        UnApprovedProductsActionWatcher(),
    ])
}
export default RootSaga;
