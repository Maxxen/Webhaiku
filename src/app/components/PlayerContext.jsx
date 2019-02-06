import React from "react";
import { connect } from "react-redux";

import VideoPlayer from "./VideoPlayer";

class PlayerContext extends React.Component{

    render(){
        return (
            <div>
              <VideoPlayer/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    current: state.reddit.videos[0]
});

export default connect(mapStateToProps)(PlayerContext);
