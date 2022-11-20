import Word from "./components/Word";
import { useState } from "react";

export default function Home() {
  let answer = "apple";
  let tries = 5;
  const [current_word_index, setCurrentWordIndex] = useState(0);
  const [try_words, setTryWords] = useState([]);

  if (try_words[try_words.length - 1] == answer) {
    setTimeout(() => window.alert("Won"), 2000);
  }
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
      />
    );
  }
  return (
    <div className="game" tabIndex={0}>
      {words}
    </div>
  );
}
