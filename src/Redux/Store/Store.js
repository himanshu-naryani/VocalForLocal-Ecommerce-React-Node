import { RootReducer } from "../Reducers/index";
import RootSaga from "../Sagas/index";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

function saveState(state) {
  try {
    
    const savedState = JSON.stringify(state);
    localStorage.setItem("state", savedState);
  } catch (e) {
    console.log(e);
  }
}
function loadState(params) {
  try {
    const savedState = localStorage.getItem("state");
    if (savedState === null) return undefined;
    return JSON.parse(savedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  RootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(RootSaga);
store.subscribe(() => saveState(store.getState()));
export default store;
