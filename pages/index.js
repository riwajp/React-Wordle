import Word from "./components/Word";
import { useState, useEffect } from "react";

export default function Home() {
  let answer = "apple";
  let tries = 5;
  const [current_word_index, setCurrentWordIndex] = useState(0);
  const [try_words, setTryWords] = useState([]);
  const [enabled, setEnabled] = useState(1);

  useEffect(() => {
    if (try_words[try_words.length - 1] == answer) {
      setEnabled(0);
      setTimeout(() => window.alert("Won"), 1999);
    } else if (try_words.length == tries) {
      setEnabled(0);
      window.alert("You lose");
    }
  }, [try_words]);
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
      />
    );
  }
  return (
    <div className="game" tabIndex={0}>
      {words}
    </div>
  );
}
