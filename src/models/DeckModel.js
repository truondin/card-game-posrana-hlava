import CardModel from "./CardModel"
const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

// Model of deck of cards
export default class DeckModel {
    constructor(emptyDeck = false) {
        this.cards = []
        if (!emptyDeck){
            this.createNewDeck()
            this.shuffle()
        }
    }

    getNumberOfCards(){
        return this.cards.length;
    }

    peek(){
        return this.cards[0]
    }

    createNewDeck(){
        this.cards = SUITS.flatMap(suit => {
            return VALUES.flatMap(value => {
                return new CardModel(suit, value)
            })
        })
    }

    pop() {
        return this.cards.shift()
    }

    discard(){
        this.cards = []
    }

    push(card) {
        this.cards.splice(0, 0, card);
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const old = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = old
        }
    }
}

