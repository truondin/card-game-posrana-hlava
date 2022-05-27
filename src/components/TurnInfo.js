import React from 'react';
import "./Components.css"

function TurnInfo(props) {

    return (
        <div className={"turnInfo"}>
            <h1>{props.isPlaying? "Jsi na řadě ": "Počkej chviličku, kamaráde"}</h1>
        </div>
    );
}

export default TurnInfo;