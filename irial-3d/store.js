import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from "./src/reducers";
import throttle from "lodash/throttle";
import { saveState, loadState } from "./src/apis/LocalStorage";
let loadedInitialState = loadState();

export function initializeStore (initialState = loadedInitialState) {
  const store =  createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  
  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );
  return store;
}
