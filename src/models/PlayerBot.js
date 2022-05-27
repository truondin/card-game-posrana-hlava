import CardModel from "./CardModel";

// Bot player that plays against user
export default class PlayerBot {
    constructor(hiddenCards, exposedCards, handCards) {
        this.hiddenCards = hiddenCards
        this.exposedCards = exposedCards.sort((a, b) => a.getNum() - b.getNum())
        this.handCards = handCards.sort((a, b) => a.getNum() - b.getNum())
    }


    takeCard(card){
        this.handCards.push(card)
        this.handCards = this.handCards.sort((a, b) => a.getNum() - b.getNum())
    }

    takeDeck(deck){
        for (let card of deck){
            this.handCards.push(card)
        }
        this.handCards = this.handCards.sort((a, b) => a.getNum() - b.getNum())
    }

    hasWon(){
        console.log(this)
        return this.handCards.length <= 0 && this.exposedCards.length <= 0 && this.hiddenCards.length <= 0;
    }

    needCard(){
        return this.handCards.length < 3;
    }

    play(topCard){
        if (this.handCards.length > 0){
            if (topCard === undefined){
                return this.handCards.shift()
            }
            let topNum = topCard.getNum()

            if (topNum === 7){
                if (this.handCards[0].getNum() <= 7){
                    return this.handCards.shift()
                }else return null
            }else{
                let index = 0
                for (let card of this.handCards){
                    if (card.getNum() >= topNum){
                        let result = new CardModel(card.getSuit(), card.getValue())

                        this.handCards.splice(index, 1)

                        return result
                    }
                    index++
                }
            }
        }else if(this.exposedCards.length > 0){
            if (topCard === undefined){
                return this.exposedCards.shift()
            }
            let topNum = topCard.getNum()
            if (topNum === 7){
                if (this.exposedCards[0].getNum() <= 7){
                    return this.exposedCards.shift()
                }else return null
            }else{
                let index = 0
                for (let card of this.exposedCards){
                    if (card.getNum() >= topNum){
                        let result = new CardModel(card.getSuit(), card.getValue())

                        this.exposedCards.splice(index, 1)

                        return result
                    }
                    index++
                }
            }
        }else if (this.hiddenCards.length > 0){
            console.log("hidden bot")
            return this.hiddenCards.shift()
        }

        return null
    }
}