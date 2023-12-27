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


function App(wordList) {
  
  const [stages, setStages] = useState ([
    {id:1, name: "start"},
    {id:2, name: "game"},
    {id:3, name: "end"},
  ])
  const [gameStage, setGameStage] = useState(stages[0].name)

  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const pickWordAndCategory = () =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  }

  // starts the secret word game
  const startGame = () => {
    // pick word and pick category
    const {word, category} = pickWordAndCategory()
    // create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)
    
    setGameStage(stages[1].name)
  }

  // process the letter input
  const verifyLetter = () =>{
    setGameStage(stages[2].name)
  }

  // restarts the game
  const retry = () =>{
    setGameStage(stages[0].name)
  }


  return (
      <div className='App'>
        {gameStage === "start" && <StartScreen startGame={startGame}/>}
        {gameStage === "game" && <GameScreen verifyLetter={verifyLetter}/>}
        {gameStage === "end" && <EndScreen retry={retry}/>}
      </div>
  )
}

export default App
