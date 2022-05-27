import React from 'react';
import "./Popups.css"

function Endgame(props) {
    const endInfo = ["You lose!", "You win!"]

    const restart = () =>{
        window.location.reload()
    }

    return (
        <div className={"popup-box"}>
            <div className={"box start"} >
                <article className={"endgame"}>
                    {props.gameResult === -1 ? "" :endInfo[props.gameResult]}
                </article>
                <button className={"submit"} onClick={restart}>RESTART</button>
            </div>
        </div>
    );
}

export default Endgame;