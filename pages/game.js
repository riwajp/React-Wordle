import Word from "./components/Word";
import { useState, useLayoutEffect, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import words_data from "./data.json";
import LettersChart from "./components/LettersChart";

export default function Home(data) {
  const [used_letters, setUsedLetters] = useState({});

  const possible_answers = words_data[0].words.filter(
    (w) => w.length == data.word_length
  );
  let answer = useMemo(
    () =>
      possible_answers[
        Math.floor(Math.random() * possible_answers.length)
      ].toLowerCase(),
    []
  );
  let tries = data.tries;
  const [current_word_index, setCurrentWordIndex] = useState(0);

  const [try_words, setTryWords] = useState([]);
  const [enabled, setEnabled] = useState(1);
  const [word_animation_finished, setWordAnimationFinished] = useState(1);
  const [game_status, setGameStatus] = useState(1);
  useEffect(() => console.log(used_letters), [current_word_index, game_status]);

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
        used_letters={used_letters}
        setUsedLetters={setUsedLetters}
      />
    );
  }
  return (
    <div className="game" tabIndex={0}>
      {words}
      <LettersChart
        used_letters={used_letters}
        word_animation_finished={word_animation_finished}
      />
    </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  return query;
};
