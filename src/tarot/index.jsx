import * as React from "react"
import AllCards from "./components/allCards"
import Interpretations from "./components/interpretations"
import Spread from "./components/spread/spread"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"
import { remove_spread } from "../context/actions"

const IndexPage = () => {
  const state = React.useContext(GlobalStateContext)
  const dispatch = React.useContext(GlobalDispatchContext)

  React.useEffect(() => {
    return () => {
      dispatch(remove_spread)
    }
  }, [])

  return (
    <>
      <AllCards />
      <Spread />
      {state.cardsFlipped >= 10 && <Interpretations />}
    </>
  )
}

export default IndexPage
