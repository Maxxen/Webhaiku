import React from "react";
import { connect } from "react-redux";

import VideoQueueItem from "./VideoQueueItem";

class VideoQueue extends React.Component {
    
    render(){
        const { videos, loading } = this.props;
        if(loading){
            return <div>Loading...</div>;
        }
        else {
            const videoItems = videos.map( (item, index) =>
                                           <VideoQueueItem key={index} name={item}/>);
            return(
                <div>
                  Videos:
                  <ul> {videoItems} </ul>
                </div>                
            );
        }
    }
}

const mapStateToProps = state => ({
    videos: state.reddit.videos,
    loading: state.reddit.fetching
});

export default connect(mapStateToProps)(VideoQueue);
