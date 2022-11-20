import Letter from "./Letter";
import { useEffect, useState } from "react";

function Word({
  answer,
  index,
  active,
  current_word_index,
  setCurrentWordIndex,
  tries,
  setTryWords,
  try_words,
}) {
  const [word, setWord] = useState("");

  var wordSetter = (k) => {
    if (k.key == "Backspace") {
      setWord(word.slice(0, -1));
    }
    if (word.length < answer.length) {
      let pattern = /[a-zA-Z]+/;
      if (pattern.test(k.key) && k.key.length == 1) {
        var new_word = word + k.key;
        setWord(new_word);
      }
    } else {
      if (k.key == "Enter") {
        if (current_word_index < tries - 1) {
          setCurrentWordIndex(index + 1);
          setTryWords([...try_words, word]);
        } else {
          window.alert("Game Over");
        }
      }
    }
  };
  useEffect(() => {
    if (active) {
      document.body.addEventListener("keydown", wordSetter);
      return () => {
        document.body.removeEventListener("keydown", wordSetter);
      };
    }
  }, [word, active]);

  return (
    <div className="word-container">
      {answer.split("").map((letter, i) => (
        <Letter
          letter={word.length > i ? word[i] : ""}
          key={i}
          index={i}
          answer={answer}
          done={current_word_index > index}
        />
      ))}
    </div>
  );
}

export default Word;
