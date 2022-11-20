import Word from "./components/Word";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  let answer = "apple";
  const [word, setWord] = useState("ri");

  var wordSetter = (k) => {
    if (word.length < answer.length) {
      if (
        (k.keyCode >= 65 && k.keyCode <= 90) ||
        (k.keyCode >= 97 && k.keyCode <= 122)
      ) {
        var new_word = word + k.key;
        setWord(new_word);
      }
    } else {
      console.log("filled");
    }
  };
  useEffect(() => {
    console.log("uf");
    document.body.addEventListener("keydown", wordSetter);
    return () => {
      document.body.removeEventListener("keydown", wordSetter);
    };
  }, [word]);

  return (
    <div className="game" tabIndex={0}>
      <Word word={word} answer={answer} />
    </div>
  );
}
