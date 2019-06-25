import { useState, useEffect, useRef, RefObject } from 'react';
import { useScript } from "./useScript";
import { Result } from "../Types/Types";

// Hack to get type inference on the global YT object set when loading iframe api
declare global {
  interface Window {YT : any;}
}
window.YT = window.YT || {};

export interface PlayerState {
    playerReady: boolean,
    playerState: YT.PlayerState,
    playerError: string,
    playerRef: RefObject<YT.Player | null>
}

export const useYoutubePlayer = (playerElem : RefObject<HTMLDivElement>) : [Result<PlayerState, Error>] => {
  const [scriptLoaded] = useScript("https://www.youtube.com/iframe_api");

  let playerRef = useRef<YT.Player | null>(null);  

  const [state, setState] = useState<Result<PlayerState, Error>>({kind: "Loading"});
  
  useEffect(
    () => {
      if(scriptLoaded.kind === "Done"){
        
        const onPlayerReady = () => {
          setState({
            kind: "Done", result: {
              playerReady: true,
              playerState: 0,
              playerError: "",
              playerRef: playerRef
            }
          })
        }

        const onPlayerStateChange = (event : YT.OnStateChangeEvent) => {
          setState({
            kind: "Done", result: {
              playerReady: true,
              playerState: event.data,
              playerError: "",
              playerRef: playerRef
            }
          })
        }

        playerRef.current = new window.YT.Player(playerElem.current!.id, {
          height: "390",
          width: "640",
          videoId: "M7lc1UVf-VE",
          events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
          }
        });
      }
      else {
        setState(scriptLoaded);
      }
    },
    [scriptLoaded]
  )
  return [state];
}


