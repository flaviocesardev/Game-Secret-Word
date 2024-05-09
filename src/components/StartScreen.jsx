import './StartScreen.css'

const StartScreen = ({ startGame, }) => {
  return (
    <div className='start'>
        <h1>
        <span>S</span>e<span>c</span>r<span>e</span>t W<span>o</span>r<span>d</span>
      </h1>
        {/* <p>Clique no botão abaixo para começar a jogar</p> */}
        <button onClick={startGame} className='buttonPlay'>Jogar!</button>
    </div>
  )
}

export default StartScreen