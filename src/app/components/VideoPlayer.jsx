import React from "react";
import { connect } from "react-redux";

let loadYT;
let YTPlayer;

//TODO, move this state out to redux
class VideoPlayer extends React.Component {
    render() {
        
        if (YTPlayer){
            YTPlayer.loadVideoById(this.props.current);
        }
        
        return (
            <div id="player"></div>
        );
    }

    componentDidMount () {
        if (!loadYT) {
            loadYT = new Promise((resolve) => {
                const tag = document.createElement('script');
                tag.src = 'http://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                window.onYouTubeIframeAPIReady = () => resolve(window.YT);
            });
        };
        loadYT.then((YT) => {
            YTPlayer = new YT.Player("player", {
                height: this.props.height || 390,
                width: this.props.width || 640,
                videoId: this.props.current,
                events: {
                    onStateChange: onPlayerStateChange
                }
            });
        });
    };
    componentWillUnmount() {
        YTPlayer.destroy();
    }
    /*
    
    
    componentDidMount() {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        //document.getElementsByTagName("head")[0].appendChild(tag);
        
        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: "_FLDmBGAQfs",
                events: {
                    "onReady": onPlayerReady,
                    "onStateChange": onPlayerStateChange
                }
            });
        }
    };
    */
}




const onPlayerReady = (event) => {
    
};

const onPlayerStateChange = (event) => {
    
};

const mapStateToProps = state => ({
    current: state.reddit.videos[0].id,
    src: "https://www.youtube.com/embed/" + state.reddit.videos[0].id
});

export default connect(mapStateToProps)(VideoPlayer);
