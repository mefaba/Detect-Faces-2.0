import React from 'react';


const Rank = ({name,entries}) => {
    return(
        <div className="center-column">
            <div className ="white f3">
                {`Hoşgeldin ${name} , Puanın:`}
            </div>
            <div className ="white f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank