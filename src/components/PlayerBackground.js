import React, {useEffect, useState} from 'react';
import "./Components.css"
import HandCards from "./cardsTrio/HandCards";
import ExposedCards from "./cardsTrio/ExposedCards";
import HiddenCards from "./cardsTrio/HiddenCards";

function PlayerBackground(props) {

    return (
        <div className={"playerBackground"}>
                <ExposedCards exposedCards={props.exposedCards} playCard={props.playExpCard} canPlay={props.canPlayExp} cardCanPlay={props.cardCanPlay}/>
                <HiddenCards hiddenCards={props.hiddenCards} playCard={props.playHiddenCard} canPlay={props.canPlayHid}
                             setHasFlipped={props.setHasFlipped} hasFlipped={props.hasFlipped} cardCanPlay={props.cardCanPlay}
                />
                <HandCards handCards={props.handCards} playCard={props.playCard} canPlay={props.isPlaying} cardCanPlay={props.cardCanPlay}/>
        </div>
    );
}

export default PlayerBackground;