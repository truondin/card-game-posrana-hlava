import React from 'react';
import "./Components.css"
import PlayDeck from "./decks/PlayDeck";

function DeckBackground(props) {
    return (
        <div className={"deckBackground-outside"}>
            <PlayDeck deck={props.playingDeck} takeDeck={props.takePlayDeck} canTake={props.canTakePlayingDeck}/>
        </div>
    );
}

export default DeckBackground;