import React from "react";

import VideoQueue from "./VideoQueue";
import SearchBar from "./SearchBar";
import PlayerContext from "./PlayerContext";

const styles = {
    display: "flex"
};

export default class Layout extends React.Component {
    render() {
        return (
            <main style={styles}>
              <div style={{flex: "3"}}>
                <PlayerContext/>
              </div>
              <div style={{flex: "1"}}>
                <SearchBar/>
                <VideoQueue items={["Item1","Item2", "Item3"]}/>
              </div>
            </main>
        );
    }
}

