import {useState, useEffect} from "react";
import {Result} from "../Types/Types";


const cachedScripts : string[] = [];

export const useScript = (src: string): [Result<{},Error>] => {
  const [state, setState] = useState<Result<{},Error>>({kind: "Loading"});

  useEffect(
    () => {
      if(cachedScripts.includes(src)) {
        setState({kind: "Done"});
      }
      else {
        cachedScripts.push(src);
        const script = document.createElement("script");
        script.src = src;
        script.async = true;

        const onLoad = () => {
          setState({kind: "Done"});
        }

        const onError = (ev : ErrorEvent) => {
          setState({kind: "Error", error: new Error(ev.message)});
        };

        script.addEventListener("load", onLoad);
        script.addEventListener("error", onError);

        document.body.appendChild(script);

        return () => {
          script.removeEventListener("load", onLoad);
          script.removeEventListener("error", onError);
        }
      }
    },
    [src]
  ); 
  return [state];
}
