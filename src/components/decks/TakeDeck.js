import React from 'react';
import {useState} from "react";
import "../Components.css";

// this component wasn't used in final work
function TakeDeck(props) {
    const [deck] = useState(props.deck)
    const [cardsNumber, setCardsNumber] = useState(deck.cards.length)
    const [topCard, setTopCard] = useState(props.takeDeck.peek())


    const takeCard = () => {
        props.takeNewCard();
        setCardsNumber(props.deck.cards.length)
        setTopCard(props.takeDeck.peek())
    }


    return (
        <div className={props.showTop ? "deck-showTop": "deck"}
            // onClick={props.showTop ? update : props.takeNewCard}
             onClick={takeCard} //todo odstranit
        >
            size: {cardsNumber}

        </div>
    );
}

export default TakeDeck;