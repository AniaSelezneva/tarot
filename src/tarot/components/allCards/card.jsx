import * as React from "react"
import * as styles from "../styles.module.scss"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../../context/GlobalContextProvider"
import { add_card } from "../../../context/actions.js"

function Card({ startMargin }) {
  const card = React.useRef()
  const [active, setActive] = React.useState(false)
  const state = React.useContext(GlobalStateContext)
  const dispatch = React.useContext(GlobalDispatchContext)

  React.useEffect(() => {
    if (active) {
      card.current.className = `${styles.is_chosen}`
    } else {
      card.current.classList.remove(`${styles.is_chosen}`)
      card.current.className = `${styles.card}`
    }
  }, [active])

  React.useEffect(() => {
    if (state.cardCount === 0) {
      setActive(false)
    }
  }, [state.cardCount])

  return (
    <img
      ref={card}
      className={styles.card}
      style={{ marginLeft: `${startMargin}px` }}
      onClick={() => {
        if (state.cardCount < 10) {
          setActive(true)
          dispatch(add_card) // count cards (not to have more than 10)
        }
      }}
      src="/cards/Back.jpg"
    ></img>
  )
}

export default Card
