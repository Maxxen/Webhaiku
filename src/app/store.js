import {applyMiddleware, createStore} from "redux";

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import rootReducer from "./reducers/rootReducer";

const logger = (store) => (next) => (action) => {
    console.log("Action: ", action)
    next(action);
}

const middleware = applyMiddleware(promise(), thunk, logger);


export default createStore(rootReducer, middleware);
