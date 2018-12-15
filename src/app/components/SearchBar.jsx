import React from "react";
import { connect } from "react-redux";
import { fetchVideos } from "../actions/redditActions";

class SearchBar extends React.Component {
    render(){
        return <button onClick={this.props.loadVideos}>Fetch Videos</button>;
    }
}

const  mapDispatchToProps = dispatch => ({
    loadVideos: () => { dispatch(fetchVideos()); }
});

export default connect(null, mapDispatchToProps)(SearchBar);
