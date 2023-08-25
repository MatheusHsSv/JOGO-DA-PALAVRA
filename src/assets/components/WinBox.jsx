import "./WinBox.css"

function WinBox({score, startGame}) {
  return (
    <div className="WinBox">
        <div className="box">
            <h1>VOÇÊ <strong>ACERTOU</strong> </h1>
              <p><span>Pontuação: <strong> {score} </strong></span></p>
            <button onClick={startGame}>Continuar</button>

        </div>
    </div>
  )
}

export default WinBox