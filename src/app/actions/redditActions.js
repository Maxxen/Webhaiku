import axios from "axios"

function fetchVideos(){
    return function(dispatch) {
        axios.get("https://www.reddit.com/r/youtubehaiku/.json")
            .then((response) => {
                dispatch({type: "FETCH_VIDEOS_FULFILLED", payload: parseJson(response.data)})
            })
            .catch((err) => {
                dispatch({type: "FETCH_VIDEOS_REJECTED", payload: err})
            })
    }
}

function parseJson(rawJSON) {
    const playlist = []
    for (var i = 0; i < rawJSON.data.children.length; i++) {
        var url = rawJSON.data.children[i].data.url;
        if (youtube_parser(url)) {
            playlist.push((youtube_parser(url)));
        }
    }

    return playlist;
}

function youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
}

export { fetchVideos }
