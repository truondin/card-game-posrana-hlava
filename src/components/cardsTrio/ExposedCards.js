import React, {useEffect, useState} from 'react';
import CardComp from "../CardComp";


function ExposedCards(props) {
    const [cards,setCards] = useState(props.exposedCards.map((card) =>
        <CardComp key={card.suit.toString() + "-" + card.value.toString()}
                  cardValue={card.value} cardSuit={card.suit}
                  playCard={props.playCard}
                  canPlay={props.canPlay} cardCanPlay={props.cardCanPlay}
                  isHid={false}
        />
    ))


    const getCards = () => {
        const content = []
        for (let c of props.exposedCards){
            content.push(c)
        }
        let ret =  content.map((card) =>
            <CardComp key={card.suit.toString() + "-" + card.value.toString()}
                      cardValue={card.value} cardSuit={card.suit}
                      playCard={props.playCard}
                      canPlay={props.canPlay} cardCanPlay={props.cardCanPlay}
                      isHid={false}
            />
        );
        setCards(ret)
    }

    useEffect(() => {
        getCards()
    }, [props.canPlay])

    useEffect(() => {
            getCards()
        }, [props.exposedCards]
    )

    return (
        <div className={"cardTrio"}>
            {cards}
        </div>
    );
}

export default ExposedCards;