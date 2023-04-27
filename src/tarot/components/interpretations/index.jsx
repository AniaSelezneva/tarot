import React from "react"
import interpretations from "../../utils/interpretations.json"
import { GlobalStateContext } from "../../../context/GlobalContextProvider"
import * as styles from "../styles.module.scss"
import Card from "./card"

function Interpretations() {
  const state = React.useContext(GlobalStateContext)
  const result = {
    "THE PRESENT / THE SELF": {
      comment:
        "This position reveals the current situation, and what is now happening. It can also be used to represent what the current state of mind is for the querent and a snapshot of who the querent is at the current moment in time.",
      interpretations: [],
    },
    "THE CHALLENGE": {
      comment:
        "This card represents the challenge that the querent is facing at this time, something that they need to resolve in order to make progress forward.",
      interpretations: [],
    },
    "THE PAST": {
      comment:
        "Here we see the the past events, and also how they have shaped the current situation. This can give us some information on influences in the past that have lead up to this state of affairs.",
      interpretations: [],
    },
    "THE FUTURE": {
      comment:
        "This card represents what could be a likely turn of events, given that nothing changes. These are usually short term happenings, and doesn’t represent the final resolution of these events.",
      interpretations: [],
    },
    CONSCIOUS: {
      comment:
        "This card explores what you are focused on, and where your mind is. This can represent your goals and your desires regarding this situation, as well as what your assumptions are.",
      interpretations: [],
    },
    UNCONSCIOUS: {
      comment:
        "The unconscious reveals what is truly driving this situation; the feelings, the beliefs and the values that perhaps the querent doesn’t even understand yet. Sometimes this card may be a surprise, and can also represent a hidden influence.",
      interpretations: [],
    },
    ADVICE: {
      comment:
        "This card can be interpreted somewhat broadly - but in general, relates to how you see yourself, and how that perception can influence how this situation plays out. What beliefs about yourself do you carry? Do you expand yourself, or limit yourself?",
      interpretations: [],
    },
    "EXTERNAL INFLUENCES": {
      comment:
        "This card represents the world around you and how it affects this situation. It may represent the social and emotional environment that you are operating in, as well as how others perceive you.",
      interpretations: [],
    },
    "HOPES AND/OR FEARS": {
      comment:
        "One of the harder positions in this spread to decode, this card can represent both what you secretly desire, as well as what you may be trying to avoid. Human nature is often paradoxical, and what we fear the most is sometimes what we also truly have been hoping for all along.",
      interpretations: [],
    },
    OUTCOME: {
      comment:
        "This card is meant to be a summary of all the previous cards. Given all that is happening, what is the likely resolution of this event? Should you find a card here that does not have a favorable outcome, you can analyze the remainder of the spread to find another course of action.",
      interpretations: [],
    },
  }
  const [markup, setMarkup] = React.useState()

  React.useEffect(() => {
    if (state.cardsFlipped >= 10) {
      interpretations.tarot_interpretations.forEach(value => {
        if (value.fileName === state.chosenCards[0]) {
          result["THE PRESENT / THE SELF"].interpretations =
            value.meanings.light
        } else if (value.fileName === state.chosenCards[1]) {
          result["THE CHALLENGE"].interpretations = value.meanings.light
        } else if (value.fileName === state.chosenCards[2]) {
          result["THE PAST"].interpretations = value.meanings.light
        } else if (value.fileName === state.chosenCards[3]) {
          result["THE FUTURE"].interpretations = value.meanings.light
        } else if (value.fileName === state.chosenCards[4]) {
          result.CONSCIOUS.interpretations = value.meanings.light
        } else if (value.fileName === state.chosenCards[5]) {
          result.UNCONSCIOUS.interpretations = value.meanings.light
        } else if (value.fileName === state.chosenCards[6]) {
          result.ADVICE.interpretations = value.meanings.light
        } else if (value.fileName === state.chosenCards[7]) {
          result["EXTERNAL INFLUENCES"].interpretations = value.meanings.light
        } else if (value.fileName === state.chosenCards[8]) {
          result["HOPES AND/OR FEARS"].interpretations = value.meanings.light
        } else if (value.fileName === state.chosenCards[9]) {
          result.OUTCOME.interpretations = value.meanings.light
        }
      })

      const finalResult = []

      Object.keys(result).forEach((key, index) => {
        finalResult.push(
          <Card
            // props={{
            //   index,
            //   meaning: key,
            //   comment: result[key].comment,
            //   interpretations: result[key].interpretations,
            // }}
            key={index}
            index={index}
            meaning={key}
            comment={result[key].comment}
            interpretations={result[key].interpretations}
          />
        )
      })

      setMarkup(finalResult)
    }
  }, [state.cardsFlipped])

  return (
    <div className={styles.interpretations_container}>
      {state.cardsFlipped >= 10 ? markup : ""}
    </div>
  )
}

export default Interpretations
