import Word from "./components/Word";
import { useEffect, useState } from "react";

export default function Home() {
  let answer = "apple";
  const [word, setWord] = useState("");
  console.log("Word Reloaded");

  useEffect(() => {
    document.body.addEventListener("keydown", (k) => {
      if (word.length < answer.length) {
        if (
          (k.keyCode >= 65 && k.keyCode <= 90) ||
          (k.keyCode >= 97 && k.keyCode <= 122)
        ) {
          console.log(word);
          setWord(word + k.key);
        }
      } else {
        console.log("filled");
      }
    });
  });
  return (
    <div className="game" tabIndex={0}>
      <Word word={word} answer={answer} />
    </div>
  );
}
