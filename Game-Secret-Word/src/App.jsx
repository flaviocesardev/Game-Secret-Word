// CSS
import './App.css'
// React
import { useCallback, useEffect, useState } from 'react'
// data
import {wordsList} from './data/words'
// components
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'


function App() {
  
  const [stages, setStages] = useState ([
    {id:1, name: "start"},
    {id:2, name: "game"},
    {id:3, name: "end"},
  ])
  const [gameStage, setGameStage] = useState(stages[0].name)

  const [words] = useState(wordsList)

  console.log(words)

  return (
      <div className='App'>
        {gameStage === "start" && <StartScreen/>}
        {gameStage === "game" && <GameScreen/>}
        {gameStage === "end" && <EndScreen/>}
      </div>
  )
}

export default App
