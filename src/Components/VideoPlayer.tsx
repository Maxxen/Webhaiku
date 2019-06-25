import React, { useEffect, useRef } from 'react';
import { Video } from "../Types/Video";
import { useYoutubePlayer, PlayerState } from '../Hooks/useYoutubePlayer';


export const VideoPlayer: React.FC<Video[]> = (videos: Video[]) => {

  const playerElem = useRef<HTMLDivElement>(null);
  const [player] = useYoutubePlayer(playerElem);  
  
  useEffect(
    () => {
      if(player.kind === "Done") {
        if(player.result!.playerState == window.YT.PlayerState.ENDED){
          const nextVideo = videos.shift();
          if(nextVideo){
              player.result!.playerRef.current!.loadVideoById(nextVideo.id);
          }
        }
      }
    },
    // This may be a problem, perhaps do a deeper comparison
    // ideally we want to recompute if [player.result.playerReady, player.result.playerState] changes
    [player.kind]
  )
  return (
    <div ref={playerElem} id="player">
    
    </div>
  )
}
