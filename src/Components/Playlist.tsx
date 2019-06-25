import {Video} from "../Types/Video";

export const Playlist: React.FC<Video[]> = (videos: Video[]) => {

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
      <img src={video.thumb} alt="thumbnail"/>
    </li>
  );
}
