import { combineReducers } from "redux";

import redditReducer from "./redditReducer"

const testReducer = function(state = {}, action) {
    return state;
}

export default combineReducers ({redditReducer, testReducer});
