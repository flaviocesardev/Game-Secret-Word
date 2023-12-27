import './EndScreen.css'

const EndScreen = ({ retry, score }) => {
  return (
    <div>
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: <span className='spanColor'>{score}</span></h2>
      <p>Obrigado por jogar! Clique no botão abaixo para jogar novamente.</p>
      <button onClick={retry} className='endButton'>Recomeçar</button>
    </div>
  )
}

export default EndScreen