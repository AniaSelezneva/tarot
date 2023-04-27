import React from "react"
import { GlobalStateContext } from "../../../context/GlobalContextProvider"
import * as styles from "../styles.module.scss"

function Card({ index, meaning: key, comment, interpretations }) {
  const commentRef = React.useRef()
  const state = React.useContext(GlobalStateContext)
  const [showComment, setShowComment] = React.useState(false)

  const callback = () => {
    setShowComment(!showComment)
  }

  React.useEffect(() => {
    if (showComment) {
      commentRef.current.style.display = "block"
    } else if (!showComment) {
      commentRef.current.style.display = "none"
    }
  }, [showComment])

  return (
    <div className={styles.container}>
      <img
        src={`/cards/${state.chosenCards[index]}.jpg`}
        alt={`${state.chosenCards[index]}`}
      />
      <div>
        <h3 onClick={callback}>
          {key}
          {/* {"\u23F7"} */}
        </h3>
        <small ref={commentRef}>{comment}</small>
        {interpretations &&
          interpretations.map((value, index) => <p key={index}> - {value}</p>)}
      </div>
    </div>
  )
}

export default Card
