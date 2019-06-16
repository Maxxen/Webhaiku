import { useState } from 'react';
import axios from "axios";

export type onBegin = () => {}
export type onError = (result: string) => {}
export type onResult = (error: string) => {}


export const useFetch: (url: string, onBegin: onBegin, onResult: onError, onError: onResult) => void
  = (url, onBegin, onResult, onError) => {
    const fetch = async () => {
      onBegin();
      try {
        const result = await axios(url);
        onResult(result.data)
      }
      catch (error) {
        onError(error);
      }
    }
    fetch();
  }
