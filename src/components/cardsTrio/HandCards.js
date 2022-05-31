import React, {useEffect, useState} from 'react';
import "../Components.css"
import CardComp from "../CardComp";

function HandCards(props) {
    const [cards,setCards] = useState(props.handCards.map((card) =>
        <CardComp key={card.suit.toString() + "-" + card.value.toString()}
                  cardValue={card.value} cardSuit={card.suit}
                  suits={[card.suit]}
                  playCard={props.playCard}
                  canPlay={props.canPlay} cardCanPlay={props.cardCanPlay}
                  isHid={false}

        />
    ))

    const getCards = () => {
        const content = []
        for (let c of props.handCards){
            content.push(c)
        }
        let ret =  content.map((card) =>
                <CardComp key={card.suit.toString() + "-" + card.value.toString()}
                          cardValue={card.value} cardSuit={card.suit}
                          suits={[card.suit]}
                          playCard={props.playCard}
                          canPlay={props.canPlay} cardCanPlay={props.cardCanPlay}
                          isHid={false}
                />
        );
        setCards(ret)
    }

    const slideLeft = () => {
        let slider = document.querySelector(".slider")
        slider.scrollLeft = slider.scrollLeft - 100

    }

    const slideRight = () => {
        let slider = document.querySelector(".slider")
        slider.scrollLeft = slider.scrollLeft + 100
    }

    useEffect(() => {
        getCards()
    }, [props.handCards, props.canPlay])

    const getSliders = (side) => {
        if (side === "left"){
            return cards.length > 0 ?<span className={cards.length > 6 ? "slider-left": "slider-hide"} onClick={slideLeft}> &lt;</span>: ""
        }else{
            return cards.length > 0 ? <span className={cards.length > 6 ? "slider-right": "slider-hide"} onClick={slideRight}>&gt;</span>: ""
        }
    }

    return (
        <div className={"handCards"}>
            {/*<span className={cards.length > 6 ? "slider-left": "slider-hide"} onClick={slideLeft}> &lt;</span>*/}
            {getSliders("left")}
            <div className={"slider"}>
                {cards}
            </div>
            {/*<span className={cards.length > 6 ? "slider-right": "slider-hide"} onClick={slideRight}>&gt;</span>*/}
            {getSliders("right")}
        </div>
    );
}

export default HandCards;