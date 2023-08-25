import { useState, useRef } from "react";
import "./Game.css";

function Game({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  retry
}) {
    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault()

      verifyLetter(letter)

      setLetter('')

      letterInputRef.current.focus()
    }

  return (
    <div className="Game">
      <p className="points">
        <span>Pontuação: <strong>{score}</strong> </span>
      </p>
      <h1>Advinhe a <strong>Palavra</strong></h1>
      <h3 className="tip">
        Dica Sobre a Palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="wordContainer">
        
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter"> {letter} </span>
          ) : (
            <span key={i} className="blankSquare"></span> 
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainner">
        <p>Letras Erradas</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>

      <div className="ButtonMenu">
      <button onClick={retry}>Sair</button>
      </div>

    </div>
  );
}

export default Game;
