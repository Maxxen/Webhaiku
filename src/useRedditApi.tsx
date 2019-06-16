import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import axios from "axios";
import { switchCase } from '@babel/types';


export type RequestState = { state: "DONE" | "LOADING" | "ERROR", data: string, error: string };

const useFetch: () => [RequestState, Dispatch<SetStateAction<string>>] = () => {
  const [url, setUrl] = useState("");

  const defaultState: RequestState = { state: "DONE", data: "", error: "" }
  const [requestState, setRequestState] = useState(defaultState);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios(url);
        setRequestState({ state: "DONE", data: result.data, error: "" });

      }
      catch (error) {
        setRequestState({ state: "ERROR", data: "", error: error });
      }
    }

  }, [url])

  return [requestState, setUrl]

}
