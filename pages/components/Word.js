import Letter from "./Letter";
import { useLayoutEffect, useEffect, useState } from "react";
import { validate } from "../../utils";

function Word({
  answer,
  index,
  active,
  current_word_index,
  setCurrentWordIndex,

  setTryWords,
  try_words,
  enabled,
  setWordAnimationFinished,
  used_letters,
  setUsedLetters,
}) {
  const [word, setWord] = useState("");
  const [result, setResult] = useState([]);
  const [letters_animation_finished, setLettersAnimationFinished] = useState(1);

  useLayoutEffect(() => {
    setWordAnimationFinished(letters_animation_finished);
  }, [letters_animation_finished]);

  var wordSetter = (k) => {
    if (k.key == "Backspace") {
      setWord(word.slice(0, -1));
    }
    if (word.length < answer.length) {
      let pattern = /[a-zA-Z]+/;
      if (pattern.test(k.key) && k.key.length == 1) {
        var new_word = word + k.key;
        setWord(new_word.toLowerCase());
      }
    } else {
      if (k.key == "Enter") {
        setCurrentWordIndex(index + 1);
        let result = [...validate(answer, word)];
        setResult(result);

        setTryWords([...try_words, word]);
      }
    }
  };
  useEffect(() => {
    if (active && enabled) {
      document.body.addEventListener("keydown", wordSetter);
      return () => {
        document.body.removeEventListener("keydown", wordSetter);
      };
    }
  }, [word, active, enabled]);

  return (
    <div className="word-container">
      {answer.split("").map((letter, i) => (
        <Letter
          letter={word.length > i ? word[i] : ""}
          key={i}
          index={i}
          result={result[i]}
          done={current_word_index > index}
          setLettersAnimationFinished={setLettersAnimationFinished}
          last_letter={i == answer.length - 1}
          used_letters={used_letters}
          setUsedLetters={setUsedLetters}
        />
      ))}
    </div>
  );
}

export default Word;
