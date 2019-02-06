import React from "react";
import { connect } from "react-redux";

import styles from "./Loadbar.css";
class Loadbar extends React.Component{
    render(){
        const { loading } = this.props;
        return (    
            <div style={{height: "5px"}}>
              <div className={loading ? styles.loading : styles.done}></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.reddit.fetching
});

export default connect(mapStateToProps)(Loadbar);
