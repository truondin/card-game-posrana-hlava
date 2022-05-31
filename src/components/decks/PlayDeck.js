import React, {useEffect} from 'react';
import {useState} from "react";
import "./Loader.css"
import sound from "./../../audio/takeDeck.mp3"

function PlayDeck(props) {
    // const [topCard, setTopCard] = useState(props.deck.peek())
    const audio = new Audio(sound)

    // useEffect(() => {
    //     setTopCard(props.deck.peek())
    // }, [props.deck.getNumberOfCards(), props.deck.peek()])

    const takeDeck = () => {
        // if (topCard!==undefined && props.canTake()){
        if (props.deck.peek() !==undefined && props.canTake()){
            audio.volume = 0.3
            audio.play()
            props.takeDeck(props.canTake())
        }
    }

    const getRed = (suit) => {
        return suit === "♥" ||suit === "♦" ? " red": "";
    }

    const topCardRender = (suit, value) => {
        return (
            <div className={"cardContent"}>
                <span className={"suit-up" + getRed(suit)}>{suit}</span>
                <span className={"cardValue" + getRed(suit)}>{value}</span>
                <span className={"suit-down" + getRed(suit)}>{suit}</span>
            </div>
        )
    }

    const noCardRender = () =>{
        return (
            <div className={"loader"}>
                <div className="loader-inner">
                    {/*ash*/}
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        // <div className={topCard===undefined || !props.canTake() ? "playDeck-empty" : "playDeck"}
        <div className={props.deck.peek() ===undefined || !props.canTake() ? "playDeck-empty" : "playDeck"}
               onClick={takeDeck}
        >
            {/*{topCard===undefined? noCardRender(): topCardRender(topCard.getSuit(), topCard.getValue())}*/}
            {props.deck.peek()===undefined? noCardRender(): topCardRender(props.deck.peek().getSuit(), props.deck.peek().getValue())}
        </div>
    );
}

export default PlayDeck;