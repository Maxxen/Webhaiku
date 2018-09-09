

export function fetchVideos(){
    return function(dispatch) {
        axios.get("https://www.reddit.com/r/youtubehaiku/.json")
            .then((response) => {
                dispatch({type: "FETCH_VIDEOS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_VIDEOS_REJECTED", payload: err})
            })
    }
}
