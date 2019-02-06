export default function reducer(state = {
    videos: [{title: "", thumb: "", id: 0}],
    fetching: false,
    fetched: true,
    error: null
    },
    action) {
    
    switch (action.type) {
        case "FETCH_VIDEOS_BEGIN": {
            return {...state, fetching: true};
        }
        case "FETCH_VIDEOS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_VIDEOS_FULFILLED": {
            return {...state, fetching: false, fetched: true, videos: action.payload}
        }
    }
    return state;
}
