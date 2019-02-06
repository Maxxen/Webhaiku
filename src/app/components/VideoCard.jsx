import React from "react";
import Text from "./Text";

export default class VideoCard extends React.Component {
    render() {
        const {title, thumb, id} = this.props.videoData;
        return(
            <div>
              <img src={thumb}></img>
              <div>
                <Text dark bold size="1.2em">{title}</Text>
                <div>ID: {id}</div>
              </div>
            </div>
        );
    }
}
