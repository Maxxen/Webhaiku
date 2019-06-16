import React, { useEffect, useState, useRef } from 'react';
import { Video } from "./App";

// Hack to type global YT object set when loading iframe api
declare global {
  interface Window {YT : any;}
}
window.YT = window.YT || {};


export const VideoPlayer: React.FC<Video[]> = (videos: Video[]) => {

  const playerElem = useRef<HTMLDivElement>(null);
  const [state] = useYoutubePlayer(playerElem);  
  
  useEffect(
    () => {
      if(state.playerState == window.YT.PlayerState.ENDED){
        const nextVideo = videos.shift();
        if(nextVideo){
            state.playerRef.current!.loadVideoById(nextVideo.id);
        }
      }
    },
    [state.playerReady, state.playerState]
  )
  return (
    <div ref={playerElem} id="player">
    
    </div>
  )
}

const useYoutubePlayer = (playerElem : React.RefObject<HTMLDivElement>) => {
  const [loaded, error] = useScript("https://www.youtube.com/iframe_api");

  let playerRef = useRef<YT.Player | null>(null);  

  const [state, setState] = useState({
    playerReady: false,
    playerState: 0,
    playerError: "",
    playerRef: playerRef
  });
  
  useEffect(
    () => {
      const onPlayerReady = () => {
        setState({
          playerReady: true,
          playerState: 0,
          playerError: "",
          playerRef: playerRef
        })
      }

      const onPlayerStateChange = (event : YT.OnStateChangeEvent) => {
        setState({
          playerReady: true,
          playerState: event.data,
          playerError: "",
          playerRef: playerRef
        })
      }

      if(loaded){
        
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
    },
    [loaded]
  )
  return [state];
}



const cachedScripts : string[] = [];
const useScript = (src: string) => {
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(
    () => {
      if(cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false
        })
      }
      else {
        cachedScripts.push(src);
        const script = document.createElement("script");
        script.src = src;
        script.async = true;

        const onLoad = () => {
          setState({
            loaded: true,
            error: false
          })
        }

        const onError = () => {
          setState({
            loaded: false,
            error: true
          });
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

  return [state.loaded, state.error];
}