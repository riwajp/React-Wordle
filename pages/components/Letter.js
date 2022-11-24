import { useLayoutEffect, useState, useEffect } from "react";
import { motion } from "framer-motion";

function Letter({
  letter,
  index,

  result,
  done,
  setLettersAnimationFinished,
  last_letter,
}) {
  //animation==============
  const [animate, setAnimate] = useState(0);
  const [className, setClassName] = useState("letter-container");
  useLayoutEffect(() => {
    if (done) {
      console.log("Done", index);

      setTimeout(() => {
        setLettersAnimationFinished(0);
        setAnimate(1);
        if (last_letter) {
          setInterval(() => setLettersAnimationFinished(1), 500);
        }
      }, index * 500);
    }
  }, [done]);

  //set class for letter container div==============
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

  //return==============
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
