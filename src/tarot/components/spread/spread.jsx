import * as React from "react"
import * as styles from "../styles.module.scss"
import Card from "./card"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../../context/GlobalContextProvider"
import { add_cards, remove_spread } from "../../../context/actions.js"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function Spread() {
  const table = React.useRef()
  const [cards, setCards] = React.useState([])
  const [names, setNames] = React.useState([]) // names of files
  const chosenCards = []
  const dispatch = React.useContext(GlobalDispatchContext)
  const state = React.useContext(GlobalStateContext)
  const downRef = React.useRef()

  const addNames = () => {
    const resultNames = []
    // Add Major
    for (let i = 0; i < 22; i++) {
      names.push(`Major${i.toString().padStart(2, "0")}`)
    }
    // Add Coins, Cups, Swords, Wands
    for (let i = 1; i < 15; i++) {
      names.push(`Coins${i.toString().padStart(2, "0")}`)
      names.push(`Cups${i.toString().padStart(2, "0")}`)
      names.push(`Swords${i.toString().padStart(2, "0")}`)
      names.push(`Wands${i.toString().padStart(2, "0")}`)
    }

    setNames(resultNames)
  }

  const chooseRandom = () => {
    let randomNum
    let limit = names.length

    for (let i = 0; i < 10; i++) {
      randomNum = getRandomInt(0, limit)
      chosenCards.push(names[randomNum])
      names.splice(randomNum, 1)
      limit--
    }

    dispatch(add_cards(chosenCards))
  }

  const addCards = () => {
    const cards = []

    for (let i = 1; i <= 10; i++) {
      cards.push(<Card key={i} num={i} fileName={chosenCards[i - 1]} />)
    }
    return cards
  }

  React.useEffect(() => {
    addNames()
    chooseRandom()
    setCards(addCards())
  }, [])

  React.useEffect(() => {
    function handleScroll() {
      setTimeout(() => {
       downRef.current.classList.remove(styles.downVisible); 
      }, 2000);
      
      downRef.current.classList.add(styles.downHidden);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.spread_container}>
      {state.cardCount < 10 ? (
        <div className={styles.info}>
          <p>Think of a question to ask</p>
          <p>Choose {10 - state.cardCount} cards</p>
        </div>
      ) : (
        <div className={styles.info}>
          <button
            onClick={() => {
              dispatch(remove_spread)
              addNames()
              chooseRandom()
              setCards(addCards())
            }}
          >
            reset
          </button>
          <p
            style={
              state.cardsFlipped < 10
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            Flip the cards
          </p>
        </div>
      )}

      <div className={styles.table} ref={table}>
        {cards}
      </div>
      <p
        ref={downRef}
        className={state.cardsFlipped === 10 ? styles.downVisible : styles.downHidden}
      >{"\u2193"}</p>
    </div>
  )
}

export default Spread
