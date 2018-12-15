import React from "react";

import VideoQueue from "./VideoQueue";
import SearchBar from "./SearchBar";

export default class Layout extends React.Component {
    render() {
        return (
            <div>
              <SearchBar/>
              <VideoQueue items={["Item1","Item2", "Item3"]}/>
            </div>
        );
    }
}

