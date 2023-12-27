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


  const guessesQuant = 5
  
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
  
  const [guessedLetters, setGuessedLetters] = useState("")
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQuant)
  const [score, setScore] = useState(0)
  
  const pickWordAndCategory = useCallback(() =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  },[words])

  // starts the secret word game
  const startGame = useCallback(() => {
    // Clear all letters
    clearLetterStates()
    // pick word and pick category
    const {word, category} = pickWordAndCategory()
    // create an array of letters
     let wordLetters = word.split("")

      wordLetters = wordLetters.map((l) => l.toLowerCase())

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // process the letter input
  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase()

    // check if letter has already been utilized
    if(
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ){
      return
    }

    // push guessed letter or remove a guess 
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGessedLetters)=>[
        ...actualGessedLetters,
        normalizedLetter
      ])
    }
    else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses((actualGuesses)=> actualGuesses - 1)
    }   

  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }



  // check if guesses ended
  useEffect(()=>{
    if(guesses <= 0){
      // reset all states
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  // check win condition
  useEffect(()=>{
    const uniqueLetters = [...new Set(letters)]

    //win condition
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      // add score
      setScore((actualScore)=>actualScore += 100)

      // restart game if new word
      setTimeout(function () {
        setGuesses(guessesQuant)
        startGame();        
      }, 600);
      
    }

   

  }, [guessedLetters, letters, startGame])

  

  // restarts the game
  const retry = () =>{
    setScore(0)
    setGuesses(guessesQuant)

    setGameStage(stages[0].name)
  }

 


  return (
      <div className='App'>
        {gameStage === "start" && <StartScreen startGame={startGame}/>}
        {gameStage === "game" && 
        <GameScreen 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
        {gameStage === "end" && <EndScreen retry={retry} score={score}/>} 
    </div>
  );
     
  
}

export default App
