import React, {useEffect, useState} from 'react';
import CardComp from "../CardComp";


function HiddenCards(props) {

    const canFlip = () => {
        return props.canPlay && !props.hasFlipped
    }

    const flipCard = () => {
        props.setHasFlipped(true)
    }

    const playCard = (card) => {
        props.setHasFlipped(false)
        props.playCard(card)
    }

    const [cards,setCards] = useState(
        props.hiddenCards.map((card) =>{

        return <CardComp key={card.suit.toString() + "-" + card.value.toString()}
                  cardValue={card.value} cardSuit={card.suit}
                  playCard={playCard}
                  canPlay={props.canPlay} cardCanPlay={props.cardCanPlay}
                  isHid={true} canFlip={canFlip} flip={flipCard}
        />
    }))

    const getCards = () => {
        const content = []
        for (let c of props.hiddenCards){
            content.push(c)
        }
        let ret =  content.map((card) =>
            <CardComp key={card.suit.toString() + "-" + card.value.toString()}
                      cardValue={card.value} cardSuit={card.suit}
                      playCard={playCard}
                      canPlay={props.canPlay} cardCanPlay={props.cardCanPlay}
                      isHid={true} canFlip={canFlip} flip={flipCard}
            />
        );
        setCards(ret)
    }

    useEffect(() => {
        getCards()
    }, [props.hiddenCards, props.canPlay, props.hasFlipped])

    return (
        <div className={"cardTrio"}>
            {cards}
        </div>
    );
}

export default HiddenCards;