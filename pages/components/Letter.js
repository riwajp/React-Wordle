import { useLayoutEffect, useState, useEffect } from "react";
import { motion } from "framer-motion";

function Letter({
  letter,
  index,
  result,
  done,
  setLettersAnimationFinished,
  last_letter,
  setUsedLetters,
}) {
  const [animate, setAnimate] = useState(0); //start animation if 1
  const [className, setClassName] = useState("letter-container");
  //========================================

  //update used letters dict in parent
  const updateUsedLetters = () => {
    setUsedLetters((used_letters) => {
      let temp_used_letters = used_letters;
      let best_score = temp_used_letters[letter]
        ? Math.max(result, temp_used_letters[letter])
        : result;

      return { ...temp_used_letters, [letter]: best_score };
    });
  };
  //========================================

  //start animation if done is true, i.e. user is in next word
  useLayoutEffect(() => {
    if (done) {
      setTimeout(() => {
        setLettersAnimationFinished(0);
        setAnimate(1);
        updateUsedLetters();
        if (last_letter) {
          setTimeout(() => {
            setLettersAnimationFinished(1);
          }, 450);
        }
      }, index * 450);
    }
  }, [done]);
  //========================================

  //set class for letter container div
  useEffect(() => {
    var temp_class = "letter-container ";
    if (done) {
      if (result == 2) {
        temp_class += "correct-place ";
      } else if (result == 1) {
        temp_class += "not-correct-place ";
      }
    }

    if (letter != "") {
      temp_class += " letter-filled";
    }

    setClassName(temp_class);
  }, [animate, letter]);
  //========================================

  return (
    <motion.div
      animate={
        animate
          ? {
              scale: [1, 1.1, 1.1, 1, 1],
            }
          : {}
      }
      className={className}
    >
      {letter}
    </motion.div>
  );
}

export default Letter;
