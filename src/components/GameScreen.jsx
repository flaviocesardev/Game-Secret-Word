import { useState, useRef } from 'react'
import './GameScreen.css'

const GameScreen = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const [letter, setLetter] = useState("")

  const letterInputRef = useRef(null)

  const handleSubmit = (event)=>{
    event.preventDefault()

    verifyLetter(letter)

    setLetter("")

    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: <span className='score'>{score}</span></span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem <span className='pAttempts'>{guesses}</span> tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>(
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span> 
            ) : (
              <span key={i} className="blankSquare"></span>            
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name='letter' 
          maxLength='1' 
          required 
          onChange={(event)=>setLetter(event.target.value)}
          value={letter}
          ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>    
      <div className="wrongLettersContainer">
        <p>Letras erradas:  
        {wrongLetters.map((wrongLetter, i)=>(
          <span key={i}>{wrongLetter}, </span>
        ))}
        </p>
      </div> 
    </div>
  )
}

export default GameScreen