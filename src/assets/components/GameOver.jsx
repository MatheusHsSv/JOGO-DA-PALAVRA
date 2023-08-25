import './GameOver.css'

function GameOver({retry, score}) {
  return (
    <div className='GameOver'>
    <h1>Fim de Jogo</h1>
    <h2><span>Sua Pontuação foi: {score}</span></h2>
    <button onClick={retry}>Reiniciar</button>
    </div>

  )
}

export default GameOver