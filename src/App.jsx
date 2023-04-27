import './App.scss'
import IndexPage from './tarot/index'
import GlobalContextProvider from "./context/GlobalContextProvider"

function App() {
  return (
    <GlobalContextProvider>
      <div className='wrapper'>
        <IndexPage />
      </div>
    </GlobalContextProvider>
  )
}

export default App
