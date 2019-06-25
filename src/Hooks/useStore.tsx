import React, { useContext, createContext, useReducer, Dispatch} from "react";
import { Video } from "../Types/Video";



export interface State {
  loading: boolean;
  videos: Video[];
}

const initialState : State = {
  loading: false,
  videos: []
};

export type Action 
  = FETCH_VIDEOS_BEGIN 
  | FETCH_VIDEOS_SUCCESS 
  | FETCH_VIDEOS_FAILURE;

export interface FETCH_VIDEOS_BEGIN {
  type: "FETCH_VIDEOS_BEGIN";
}

export interface FETCH_VIDEOS_SUCCESS {
  type: "FETCH_VIDEOS_SUCCESS"
  payload: Video[];
}

export interface FETCH_VIDEOS_FAILURE {
  type: "FETCH_VIDEOS_FAILURE";
}

const reducer : (state: State, action : Action) => State = (state, action) => {
  console.log(action.type);
  switch(action.type) {
    case "FETCH_VIDEOS_BEGIN": {
      return {...state, loading: true};
    }
    case "FETCH_VIDEOS_SUCCESS": {
      return {...state, loading: false, videos: action.payload};
    }
    case "FETCH_VIDEOS_FAILURE": {
      return {...state, loading: false};
    }
    default:
      throw new Error();
  }
}


export const useStore = () => useReducer(reducer, initialState);