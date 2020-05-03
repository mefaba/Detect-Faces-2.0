import React from 'react';
import "./FaceRecognition.css"

const FaceRecognition = ({image, boxes}) => {
    return(
        <div className="centerit ma">
            <div className="absolute mt2">
                <img id="inputimage" src={image} alt="buradafoto" width="500px" height="auto" />
                {
                    boxes.map(box=>{
                        return <div key={box.topRow} className="bounding-box" style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}} > </div>
                    })
                }
                
            </div>
        </div>

    )
}

export default FaceRecognition