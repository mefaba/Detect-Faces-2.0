import React from 'react';
import Tilt from 'react-tilt'
import "./Logo.css"
import searcher from "./anger.png"

const Logo = () => {
    return(
        <div className = "ma4 mt0">
            <Tilt className="Tilt" options={{ max : 35 }} style={{borderRadius: "3px", height: 150, width:150 }} >
                <div className="Tilt-inner pa3">
                    <img alt = "logomuz" src = {searcher} style={{paddingTop: "8px", paddingLeft:"10px", height: 100, width:"auto" }}/>
                </div>
            </Tilt>
        </div>

    )
}

export default Logo