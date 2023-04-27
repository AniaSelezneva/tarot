import React, { createContext, useReducer } from "react"

export const initialState = {
  cardCount: 0,
  chosenCards: [],
  cardsFlipped: 0,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return { ...state, cardCount: state.cardCount + 1 }
    case "ADD_CARDS":
      return { ...state, chosenCards: action.payload }
    case "ADD_FLIPPED_CARD":
      return { ...state, cardsFlipped: state.cardsFlipped + 1 }
    case "REMOVE_SPREAD":
      return { cardCount: 0, chosenCards: [], cardsFlipped: 0 }

    default:
      throw new Error()
  }
}

export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider

// Provider sends state and dispatch to all the lower components.
// Lower components will access it through useContext(store).
// Store is created here.
