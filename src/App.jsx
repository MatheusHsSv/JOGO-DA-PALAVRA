//CSS
import "./App.css";

//REACT
import { useState, useEffect } from "react";

//COMPONENTS
import StartScreen from "./assets/components/StartScreen";
import Game from "./assets/components/Game";
import GameOver from "./assets/components/GameOver";
import WinBox from "./assets/components/WinBox"

//DATA
import { wordsList } from "./assets/data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
  { id: 4, name: "winBox"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPicedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick a random word

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];


    return { word, category };
  };

  //Starts the Game
  const startGame = () => {
    //PICK WORD AND PICK CATEGORY
    const { word, category } = pickWordAndCategory();

    console.log(word,category)
    //Clear states
    clearLetterStates();
    //SPLIT THE LETTERS AND PUT IN LOWERCASE
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());


    //FILL STATES
    setPickedWord(word);
    setPicedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  //Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) ||
    wrongLetters.includes(normalizedLetter)
    ){
      return;
    }

    //PUSH GUESSED LETTER OR REMOVE A GUESS
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])


    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses -1)
    }
  };

 

   //check win condition
  useEffect(() =>{
      const uniqueLetters = [...new  Set(letters) ]
      console.log(uniqueLetters)
      console.log(guessedLetters)
      //win condition
      if((guessedLetters.length === uniqueLetters.length) && (guessedLetters.length !== 0 && uniqueLetters.length !== 0)) {
        console.log('caiu')
        
      //add score
      
      
      
      setScore((actualScore) => actualScore +++ 100);

      startGame()

      setGameStage(stages[3].name)
      }

  }, [guessedLetters, letters])

   //Check if guesses end

   const clearLetterStates = () => {
      setGuessedLetters([]);
      setWrongLetters([]);
      setLetters("")
    };

    useEffect(() =>{
      if(guesses <= 0) {
        setGameStage(stages[2].name);
      }
    }, [guesses])

    

  
  //Restart the game
  const retry = () => {
    setScore([0])
    setGuesses([3])
    clearLetterStates()
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          retry={retry}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}

        {gameStage === "winBox" && <WinBox score={score} startGame={startGame}/> }

    </div>
  );
}

export default App;
