import React, { Dispatch, useState } from 'react';
import axios from "axios";
import './App.css';
import { RedditResponse, RedditPost, RedditLink, RedditMedia } from './RedditResponse';
import { useStore, Action } from './Store';
import { VideoPlayer } from './VideoPlayer';

const App: React.FC = () => {

  const [state, dispatch] = useStore()

  return (
    <div>
      <header>
        <h1>Web-Haiku</h1>
      </header>
      <main>
        {VideoPlayer(state.videos)}
        {SearchBar(dispatch)}
        {VideoList(state.videos)}
      </main>
    </div> 
  );
}


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
  return videos;
}

const ParseID: (url: string) => string | false = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : false;
}

export interface Video {
  title: string;
  id: string;
  thumb: string;
  score: number;
  author: string;
  postedBy: string;
}


const SearchBar: React.FC<Dispatch<Action>> = (dispatch: Dispatch<Action>) => {

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

const VideoList: React.FC<Video[]> = (videos: Video[]) => {

  return (
    <div>
      <h2>Videos</h2>
      <ul>
        {videos.map((video, index) => VideoCard(video, index))}
      </ul>
    </div>
  );
}

const VideoCard: React.FC<Video> = (video: Video, key: number) => {
  return (
    <li key={key}>
      <h3>{video.title}</h3>
      <span>{video.id}</span>
      <div>
        Score: <span>{video.score}</span>
      </div>
      <img src={video.thumb} alt="thumbnail" />>
        </li>
  );
}


export default App;
