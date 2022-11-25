import React from "react";

function LettersChart({ used_letters, word_animation_finished }) {
  let letters = "abcdefghijklmnopqrstuvwxyz".split("");
  let class_names = ["letters-chart-0", "letters-chart-1", "letters-chart-2"];

  return (
    <div className="letters-chart-container">
      {letters.map((l) => (
        <div
          className={
            "letters-chart-letter " +
            (used_letters && used_letters[l] != undefined
              ? class_names[used_letters[l]]
              : "")
          }
        >
          {l}
        </div>
      ))}
    </div>
  );
}

export default LettersChart;
