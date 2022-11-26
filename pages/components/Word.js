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
  const [word, setWord] = useState(""); //current word being typed by user
  const [result, setResult] = useState([]); //array of score for corresponding letters of the word (Array of elements 0,1,2)
  const [letters_animation_finished, setLettersAnimationFinished] = useState(1); // animation status of letters, finished or not?

  //========================================

  //set animation status of words in parent
  useLayoutEffect(() => {
    setWordAnimationFinished(letters_animation_finished);
  }, [letters_animation_finished]);
  //========================================

  //handle key press of event listener
  var handleKeyDown = (k) => {
    if (k.key == "Backspace") {
      setWord(word.slice(0, -1));
    }
    if (word.length < answer.length) {
      //if not end of word
      let pattern = /[a-zA-Z]+/;
      if (pattern.test(k.key) && k.key.length == 1) {
        //if input is letter, update the word
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
  //========================================

  //event listeners
  useEffect(() => {
    if (active && enabled) {
      document.body.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [word, active, enabled]);
  //========================================

  return (
    <div className="word-container">
      {answer?.split("")?.map((letter, i) => (
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
