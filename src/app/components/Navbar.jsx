import React from "react";
import Loadbar from "./Loadbar.jsx";
import styles from "./Navbar.css";


export default class Navbar extends React.Component{

    render(){
        return (
            <nav className={styles.nav}>
              <Loadbar/>
              <h1>Webhaiku</h1>
            </nav>
        );
    }
}


