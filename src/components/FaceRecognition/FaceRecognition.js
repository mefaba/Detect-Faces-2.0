import React from 'react';


const FaceRecognition = ({image}) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img src={image} alt="buradafotoğraf" width="300px" height="auto" />
            </div>
        </div>

    )
}

export default FaceRecognition