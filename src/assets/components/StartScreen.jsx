import "./StartScreen.css";

function StartScreen({ startGame }) {
  return (
    <div className="Start">
      <h1>Secret <strong>Word</strong></h1>
      <p>clique no botao abaixo para começar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  );
}

export default StartScreen;
