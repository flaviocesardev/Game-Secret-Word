import './EndScreen.css'

const EndScreen = ({ retry }) => {
  return (
    <div>
      <h1>Final</h1>
      <button onClick={retry}>Volta ae</button>
    </div>
  )
}

export default EndScreen