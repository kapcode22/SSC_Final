import  {createStore ,combineReducers, applyMiddleware} from "redux";
import { thunk } from 'redux-thunk'; // Correct way to import named export

import updateReducer from "./reducers/updatesReducer";
import spcReducer from "./reducers/spcReducer"
import kuReducer from "./reducers/kuReducer"
import hhcReducer from "./reducers/hhcReducer"
import sahyogReducer from "./reducers/sahyogReducer"
let store =createStore(combineReducers({
    updateReducer:updateReducer,
    spcReducer: spcReducer,
    kuReducer: kuReducer,
    hhcReducer: hhcReducer,
    sahyogReducer: sahyogReducer
}),applyMiddleware(thunk))

export default store