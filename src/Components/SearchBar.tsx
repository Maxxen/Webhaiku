import { RedditResponse, RedditPost, RedditLink, RedditMedia } from "../Types/RedditResponse";
import { Video } from "../Types/Video";
import { Dispatch, useState} from 'react';
import { Action } from "../Hooks/useStore";
import axios from 'axios';

const ParseVideos: (res: RedditResponse) => Video[] = (res) => {
  let videos: Video[] = []
  if (res.kind = "Listing") {
    res.data.children.map((post: RedditPost) => {
      if (post.kind == "t3"
        && post.data.media != null
        && post.data.media.type == "youtube.com") {
        let videoId = ParseID(post.data.url);
        if (videoId != false) {
          videos.push({
            title: post.data.media.oembed.title,
            id: videoId,
            thumb: post.data.media.oembed.thumbnail_url,
            score: post.data.score,
            author: post.data.media.oembed.author_name,
            postedBy: post.data.author
          })
        }
      }
    });
  }
  else {
    throw new Error("Invalid JSON")
  }
  return videos;
}

const ParseID: (url: string) => string | false = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : false;
}


export const SearchBar: React.FC<Dispatch<Action>> = (dispatch: Dispatch<Action>) => {

  const [value, setValue] = useState("");

  const fetch = async () => {
    dispatch({ type: "FETCH_VIDEOS_BEGIN" })
    try {
      const result = await axios(value + ".json");
      const videoData = ParseVideos(result.data);
      dispatch({ type: "FETCH_VIDEOS_SUCCESS", payload: videoData });
    }
    catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_VIDEOS_FAILURE" });
    }
  }

  return (
    <div>
      <input type="text"
        name="reddit url"
        onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => { setValue(event.target.value) }
        }
      />
      <input
        type="button"
        value="fetch"
        onClick={(event: React.MouseEvent<HTMLElement>) => { fetch() }}
      />
    </div>
  )
}