import axios from "axios"

function fetchVideos(){
    return function(dispatch) {
        dispatch({type: "FETCH_VIDEOS_BEGIN"})
        axios.get("https://www.reddit.com/r/youtubehaiku/.json")
            .then((response) => {
                dispatch({type: "FETCH_VIDEOS_FULFILLED", payload: parseVideo(response.data)})
            })
            .catch((err) => {
                dispatch({type: "FETCH_VIDEOS_REJECTED", payload: err})
            })
    }
}

function parseVideo(json){
    return json.data.children.reduce( (acc, vid) => {
        const id = youtube_parser(vid.data.url)
        if(id)
            acc.push({title: vid.data.title, thumb: vid.data.thumbnail, id: id});
        return acc;
    }, []);   
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
