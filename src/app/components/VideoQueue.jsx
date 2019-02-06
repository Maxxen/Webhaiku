import React from "react";
import { connect } from "react-redux";

import VideoCard from "./VideoCard";

class VideoQueue extends React.Component {
    
    render(){

        const { videos, loading } = this.props;
        
        let content = loading ? "Loading..." : renderItems(videos);
        
        return <div> {content} </div>;
    }
}

const renderItems = (videos) => {
    return <ul>
             {videos.map( (item, index) =>
                          <li key={index}>
                            <VideoCard videoData={item}/>
                          </li>
                        )}
           </ul>;
};

const mapStateToProps = state => ({
    videos: state.reddit.videos,
    loading: state.reddit.fetching
});

export default connect(mapStateToProps)(VideoQueue);
