import * as React from "react"
import * as styles from "../styles.module.scss"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../../context/GlobalContextProvider"
import { add_cards_flipped } from "../../../context/actions.js"

function Card({ num, fileName }) {
  const card = React.useRef()
  const cardFront = React.useRef()
  const state = React.useContext(GlobalStateContext)
  const dispatch = React.useContext(GlobalDispatchContext)
  const [clicked, setClicked] = React.useState(false) // not to be able to cound clicks on the same card

  // Show back of the card when it's chosen
  React.useEffect(() => {
    if (state.cardCount === 0) {
      card.current.classList.remove(`${styles.is_active}`)
      card.current.classList.remove(`${styles.is_active_second}`)
      card.current.className = `${styles.spread_card}`

      cardFront.current.classList.remove(`${styles.card_front_chosen}`)
      cardFront.current.className = `${styles.card_front}`
    } else if (num === state.cardCount) {
      cardFront.current.className = `${styles.card_front_chosen}`
    }
  }, [state.cardCount])

  const callback = () => {
    console.log(state.cardCount)
    if (state.cardCount >= 10) {
      if (!clicked) {
        dispatch(add_cards_flipped)
        setClicked(true)
      }
      // If it's a second card (rotated)
      if (num === 2) {
        card.current.className = `${styles.is_active_second}`
      } else {
        card.current.className = `${styles.is_active}`
      }
    }
  }

  React.useEffect(() => {
    state.cardsFlipped === 0 && setClicked(false)
  }, [state.cardsFlipped])

  return (
    <div className={styles.spread_card} ref={card} onClick={callback}>
      <div className={styles.card_front} ref={cardFront} />
      <img
        src={`/cards/${fileName}.jpg`}
        className={styles.card_back}
        alt={`${fileName}`}
      />
    </div>
  )
}

export default Card
