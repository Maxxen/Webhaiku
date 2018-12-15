import { combineReducers } from "redux";

import reddit from "./redditReducer";

const test = function(state = {}, action) {
    return state;
}

export default combineReducers ({
    reddit,
    test
});


