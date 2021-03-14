import { Types } from '../Actiontypes/UnApprovedProductsTypes'
import { put, call, takeLatest } from 'redux-saga/effects';
import { unApprovedProductsApi } from '../Apis/UnApprovedProductsApi'
import { productsAction } from '../Actioncreators/PendingProductsActions'

function* getUnApprovedProducts() {
    try {

        const data = yield call(unApprovedProductsApi);

        yield put(productsAction(data.data))
    }
    catch {
        yield put(productsAction("Unable To Fetch the data"))
    }
}

export function* UnApprovedProductsActionWatcher() {
    yield takeLatest(Types.GetProducts, getUnApprovedProducts)
}

