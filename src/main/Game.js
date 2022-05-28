import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import DeckBackground from "../components/DeckBackground";
import {Button, Container} from "react-bootstrap";
import PlayerBackground from "../components/PlayerBackground";
import TurnInfo from "../components/TurnInfo";
import DeckModel from "../models/DeckModel";
import PlayerBot from "../models/PlayerBot";
import Rules from "../components/popups/Rules";
import Endgame from "../components/popups/Endgame";
import winSound from "./../audio/win.mp3"
import loseSound from "./../audio/lose.mp3"

var takingDeckModel = new DeckModel(false);
var playingDeckModel = new DeckModel(true);

const exposeds = [takingDeckModel.pop(), takingDeckModel.pop(), takingDeckModel.pop()]
const hiddens = [takingDeckModel.pop(), takingDeckModel.pop(), takingDeckModel.pop()]
const hands = [takingDeckModel.pop(), takingDeckModel.pop(), takingDeckModel.pop()]

const playerBot = new PlayerBot([takingDeckModel.pop(), takingDeckModel.pop(), takingDeckModel.pop()],
    [takingDeckModel.pop(), takingDeckModel.pop(), takingDeckModel.pop()],
    [takingDeckModel.pop(), takingDeckModel.pop(), takingDeckModel.pop()])
const winS = new Audio(winSound)
const loseS = new Audio(loseSound)

for (let i =0; i < 40 -9; i++){
    takingDeckModel.pop()
}

function Game(props) {
    const [takingDeck, setTakingDeck] = useState(takingDeckModel);
    const [playingDeck, setPlayingDeck] = useState(playingDeckModel);

    const [playerExposedCards, setPlayerExposedCards] = useState(exposeds)
    const [playerHiddenCards, setPlayerHiddenCards] = useState(hiddens)
    const [playerHandCards, setPlayerHandCards] = useState(hands.sort((a, b) => a.getNum() - b.getNum()))

    const [canPlayExpAndHidden, setCanPlayExpAndHidden] = useState(false)
    const [expPlay, setExpPlay] = useState(canPlayExpAndHidden)
    const [canPlayHidden, setCanPlayHidden] = useState(false)
    const [hidPlay, setHidPlay] = useState(canPlayExpAndHidden && canPlayHidden)
    const [hasFlipped, setHasFlipped] = useState(false)

    const [lastCardValue, setLastCardValue] = useState(null)
    const [numOfLCV, setNumOfLCV] = useState(0)

    const [showPopup, setShowPopup] = useState(false)
    const [showEndgame, setShowEndgame] = useState(false)
    const [winner, setWinner] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(true)

    const toggleEndgame = () => {
        setShowEndgame(!showEndgame)
    }

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const takeNewCard = () =>{
        if (takingDeckModel.getNumberOfCards() > 0){
            let card = takingDeckModel.pop()
            setTakingDeck(takingDeckModel)

            let newHandCards = [card]
            for (let c of playerHandCards){
                newHandCards.push(c)
            }
            newHandCards.sort((a, b) => a.getNum() - b.getNum())
            setPlayerHandCards(newHandCards)
        }
    }

    const discardPlayingDeck = () => {
        playingDeckModel.discard()
        setPlayingDeck(playingDeckModel)
    }

    const applyCardRules = (card) => {
        updateLastCard(card)
        switch (card.getNum()){
            case 10: {
                discardPlayingDeck()
                break
            }
            default: {
                if (numOfLCV === 3){
                    discardPlayingDeck()
                }else{
                    playingDeckModel.push(card);
                }
                setIsPlaying(false)
            }
        }
    }

    const updateLastCard = (card) => {
        if (lastCardValue == null || lastCardValue !== card.getValue()){
            setLastCardValue(card.getValue())
            setNumOfLCV(1)
        }else{
            setNumOfLCV(numOfLCV + 1)
        }
    }


    const canPlay = card => {
        if (isPlaying){
            return canPlayCard(card)
        }else return false
    }

    const canPlayCard = card => {
        const topCard = playingDeckModel.peek();
        if (topCard === undefined) return true;

        const topCardNum = topCard.getNum()
        const cardNum = card.getNum()
        switch (topCardNum){
            case 2: return true;
            case 7: return cardNum <= topCardNum;
            default: {
                switch (cardNum){
                    case 2 : return true;
                    case 10: return topCardNum !== 7
                    default: return topCardNum <= cardNum
                }
            }
        }
    }

    const playCard = (card) =>{
        let index = 0
        for (let c of playerHandCards){
            if (c.getSuit() === card.getSuit() && c.getNum() === card.getNum()){
                // playingDeckModel.push(c);
                if (canPlay(c)){

                    applyCardRules(c)
                    setPlayingDeck(playingDeckModel);

                    playerHandCards.splice(index, 1)
                    setPlayerHandCards(playerHandCards.slice());


                    if (playerHandCards.length < 3){
                        takeNewCard();

                    }
                }
                break;
            }
            index++;
        }

        setCanPlayExpAndHidden(playerHandCards.length <= 0 && takingDeck.getNumberOfCards() <= 0);
    }

    const playExpCard = card => {
        if (expPlay && isPlaying){
            let index = 0
            for (let c of playerExposedCards){
                if (c.getSuit() === card.getSuit() && c.getNum() === card.getNum()){
                    if (canPlay(c)) {
                        applyCardRules(c)
                        setPlayingDeck(playingDeckModel);

                        playerExposedCards.splice(index, 1)
                        setPlayerExposedCards(playerExposedCards.slice());
                    }
                    break;
                }
                index++;
            }
            if (playerExposedCards.length <= 0) setCanPlayHidden(true);
        }
    }


    const playHiddenCard = card => {
        if (hidPlay && isPlaying){
            let index = 0
            for (let c of playerHiddenCards){
                if (c.getSuit() === card.getSuit() && c.getNum() === card.getNum()){

                    if (canPlay(c)) {
                        applyCardRules(c);
                        setPlayingDeck(playingDeckModel);
                    }else{
                        playingDeckModel.push(card)
                        setPlayingDeck(playingDeckModel)
                        takePlayingDeck(true)
                    }
                    playerHiddenCards.splice(index, 1)
                    setPlayerHiddenCards(playerHiddenCards.slice());
                    break;
                }
                 index++;
            }
        }
    }

    const canTakePlayingDeck = () => {
        let size = playingDeckModel.getNumberOfCards()

        return (size > 0 && !hasFlipped && isPlaying)
    }

    const takePlayingDeck = (canTake) => {
        let size = playingDeckModel.getNumberOfCards()

        if (size > 0 && canTake && isPlaying) {

            let toAdd = []
            for (let i = 0; i < size; i++) {
                let card = playingDeckModel.pop()
                setPlayingDeck(playingDeckModel)
                toAdd.push(card)
            }

            for (let c of playerHandCards) {
                toAdd.push(c)
            }
            toAdd.sort((a, b) => a.getNum() - b.getNum())
            setPlayerHandCards(toAdd)

            setCanPlayExpAndHidden(false)
            setIsPlaying(false)
        } else console.log("deck not taken")

    }

    useEffect(()=>{
        setExpPlay(canPlayExpAndHidden)
        setHidPlay(canPlayExpAndHidden && canPlayHidden)
    }, [canPlayExpAndHidden, canPlayHidden])

    // game loop between player and bot
    useEffect(() => {
        if (!isPlaying){
            setTimeout(() => {
                let topCard = playingDeck.peek()
                let card = playerBot.play(topCard)

                if (card !== null){
                    if (canPlayCard(card)){
                        applyCardRules(card)

                        if (playerBot.needCard()) {
                            if (takingDeckModel.getNumberOfCards() > 0) {
                                let newCard = takingDeckModel.pop()
                                setTakingDeck(takingDeckModel)
                                playerBot.takeCard(newCard)
                            }
                        }

                    }
                    else{
                        let size = playingDeckModel.getNumberOfCards()
                        let toAdd = [card]
                        for (let i = 0; i < size; i++) {
                            let c = playingDeckModel.pop()
                            setPlayingDeck(playingDeckModel)
                            toAdd.push(c)
                        }

                        playerBot.takeDeck(toAdd)
                    }
                }else{
                    let size = playingDeckModel.getNumberOfCards()
                    let toAdd = []
                    for (let i = 0; i < size; i++) {
                        let c = playingDeckModel.pop()
                        setPlayingDeck(playingDeckModel)
                        toAdd.push(c)
                    }

                    playerBot.takeDeck(toAdd)
                }


                if (playerBot.hasWon()){
                    loseS.volume = 0.4
                    loseS.currentTime = 0.5
                    loseS.play()
                    loseS.play()
                    setShowEndgame(true)
                    setWinner(0)
                }
                setIsPlaying(true)
            }, 2000)
        }
        if (playerHandCards.length <= 0 && playerExposedCards.length <= 0 && playerHiddenCards.length <= 0){
            console.log("win")
            winS.volume = 0.4
            winS.currentTime = 0.5
            winS.play()
            setShowEndgame(true)
            setWinner(1)
        }else{
            console.log("no win yet")
        }

    }, [isPlaying])

    return (
        <Container className={"game"}>
            {showPopup && <Rules togglePopup={togglePopup}/>}
            {showEndgame && <Endgame gameResult={winner} togglePopup={toggleEndgame}/>}

            <Menu togglePopup={togglePopup} setEnd={setShowEndgame} username={props.username} setUsername={props.setUser}/>
            <TurnInfo isPlaying={isPlaying}/>
            <div >
                <DeckBackground
                    playingDeck={playingDeck} takePlayDeck={takePlayingDeck} canTakePlayingDeck={canTakePlayingDeck}
                />
                <PlayerBackground isPlaying={isPlaying}
                                  exposedCards={playerExposedCards} canPlayExp={(expPlay && isPlaying)}
                                  hiddenCards={playerHiddenCards} canPlayHid={(hidPlay && isPlaying)}
                                  handCards={playerHandCards}
                                  playCard={playCard} playExpCard={playExpCard} playHiddenCard={playHiddenCard}
                                  setHasFlipped={setHasFlipped} hasFlipped={hasFlipped}
                                  cardCanPlay={canPlayCard}
                />
            </div>
        </Container>
    );
}

export default Game;