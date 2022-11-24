import Word from "./components/Word";
import { useState, useLayoutEffect } from "react";

export default function Home() {
  let answer = "apple";
  let tries = 5;
  const [current_word_index, setCurrentWordIndex] = useState(0);
  const [try_words, setTryWords] = useState([]);
  const [enabled, setEnabled] = useState(1);
  const [word_animation_finished, setWordAnimationFinished] = useState(1);
  const [game_status, setGameStatus] = useState(1);

  useLayoutEffect(() => {
    if (try_words[try_words.length - 1] == answer) {
      setGameStatus(0);
      setEnabled(0);
      setTimeout(() => window.alert("Won"), answer.length * 500);
    } else if (try_words.length == tries) {
      setGameStatus(0);

      setEnabled(0);
      setTimeout(() => window.alert("Game Over"), answer.length * 500);
    } else {
      setEnabled(1);
    }
  }, [try_words]);

  useLayoutEffect(() => {
    if (game_status) {
      setEnabled(word_animation_finished);
    }
  }, [word_animation_finished]);
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
      />
    );
  }
  return (
    <div className="game" tabIndex={0}>
      {words}
    </div>
  );
}
