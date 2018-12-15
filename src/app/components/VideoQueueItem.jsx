import React from "react";

export default class VideoQueueItem extends React.Component {
    render() {
        return(
            <li>
              <h3>{this.props.name}</h3>
            </li>
        );
    }
}
