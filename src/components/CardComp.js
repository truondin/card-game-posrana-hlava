import React, {useState} from 'react';
import "./Components.css"
import CardModel from "../models/CardModel";
import sound from "./../audio/card.mp3"

const audio = new Audio(sound)

function CardComp(props) {
    const [isHid, setIsHid] = useState(props.isHid)
    const [card] = useState(new CardModel(props.cardSuit, props.cardValue))

    const canPlay = () => {
        return props.canPlay && props.cardCanPlay(card)
    }

    const play = () => {
        if (canPlay()){
            audio.currentTime = 0.15
            audio.volume = 0.4
            audio.play()
        }
            props.playCard(card)
    }

    const flip = () => {
        setIsHid(!props.isHid)
        props.flip()
    }

    const flipClick = (id) =>{
        document.querySelector("#"+ id).checked = true
    }

    const getRed = () => {
        return props.cardSuit === "♥" ||props.cardSuit === "♦" ? " red": "";
    }

    const renderCard = () =>{
        if (!isHid){
            return (

                <div className={canPlay() === true? "card": "card-forbidden"} onClick={play}>
                    <div className={"cardContent"}>
                        <span className={"suit-up" + getRed() }>{props.cardSuit}</span>
                        <span className={"cardValue" + getRed()}>{props.cardValue}</span>
                        <span className={"suit-down" + getRed()}>{props.cardSuit}</span>
                    </div>
                </div>)
        }else{
            return (
                <div className={"cardContainer"}
                     onClick={() => {flipClick(props.cardSuit.toString() + props.cardValue.toString())}}
                     onTransitionEndCapture={flip}
                >
                    <input className={"cardCheck"} checked={false} type={"checkbox"} id={props.cardSuit.toString() + props.cardValue.toString()}/>
                    <div className={props.canFlip() === true? "card-hidden": "card-hidden-forbidden"} >
                            <div className={"frontCard"}>
                                <div className={"cardContent"}>
                                    <span className={"suit-up" + getRed() }>{props.cardSuit}</span>
                                    <span className={"cardValue" + getRed()}>{props.cardValue}</span>
                                    <span className={"suit-down" + getRed()}>{props.cardSuit}</span>
                                </div>
                            </div>
                        <div className={"backCard"}/>
                    </div>
                </div>)
        }
    }

    return renderCard()
}


export default CardComp;