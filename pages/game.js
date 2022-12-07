import Word from "./components/Word";
import { useState, useLayoutEffect, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import words_data from "./data.json";
import LettersChart from "./components/LettersChart";
import GameButtons from "./components/GameButtons";

export default function Home(data) {
  //array of all words with given length, loaded from the data.json file
  const possible_answers = words_data[0].words.filter(
    (w) => w.length == data.word_length
  );
  //========================================

  //the word for this game, randomly selected from the array possible_answers
  let answer = useMemo(
    () =>
      possible_answers[
        Math.floor(Math.random() * possible_answers.length)
      ].toLowerCase(),
    []
  );
  //========================================

  let tries = data.tries; //number of tries, from getInitialProps

  const [current_word_index, setCurrentWordIndex] = useState(0); //the index of current attempt
  const [used_letters, setUsedLetters] = useState({}); //the list of letters used and their scores i.e. whether it was guessed correctly, correct position, etc.
  const [try_words, setTryWords] = useState([]); // the list of all the words enterd so far
  const [enabled, setEnabled] = useState(1); //is listener enabled ? toggled based on if letters animation is completed, or game_status is true
  const [word_animation_finished, setWordAnimationFinished] = useState(1); //is the animation of all the letters of the last entered word finished?
  const [game_status, setGameStatus] = useState(1); //is the game still running ? Or it's ended (either won or over)
  //========================================

  //check if the user has won(guessed the word correctly) or lost (out of tries)
  useLayoutEffect(() => {
    if (try_words[try_words.length - 1] == answer) {
      setGameStatus(0);
      setEnabled(0);
      setTimeout(() => window.alert("Won"), answer.length * 500);
    } else if (try_words.length == tries) {
      setGameStatus(0);

      setEnabled(0);
      setTimeout(
        () => window.alert("Game Over" + " " + answer),
        answer.length * 500
      );
    } else {
      setEnabled(1);
    }
  }, [try_words]);
  //========================================

  //enable or disable event listeners based on letters animation status
  useLayoutEffect(() => {
    if (game_status) {
      setEnabled(word_animation_finished);
    }
  }, [word_animation_finished]);
  //========================================

  //create array of all words boxes
  let words = [];
  for (let i = 0; i < tries; i++) {
    words.push(
      <Word
        answer={answer}
        index={i}
        key={i}
        active={current_word_index == i}
        setCurrentWordIndex={setCurrentWordIndex}
        current_word_index={current_word_index}
        tries={tries}
        setTryWords={setTryWords}
        try_words={try_words}
        enabled={enabled}
        setEnabled={setEnabled}
        setWordAnimationFinished={setWordAnimationFinished}
        used_letters={used_letters}
        setUsedLetters={setUsedLetters}
      />
    );
  }
  //========================================

  return (
    <div className="game">
      <div
        style={{
          color: "white",
          fontSize: 20,
          textDecoration: "underline",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <a
          href="https://mashable.com/article/wordle-word-game-what-is-it-explained"
          target={"_blank"}
        >
          How to play?
        </a>
      </div>
      <GameButtons />
      {words}
      <LettersChart
        used_letters={used_letters}
        word_animation_finished={word_animation_finished}
      />
    </div>
  );
}

//========================================

//get form data (tries and word length)
Home.getInitialProps = async ({ query }) => {
  return query;
};
