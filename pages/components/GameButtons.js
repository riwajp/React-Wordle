import React from "react";
import Link from "next/link";

function GameButtons() {
  return (
    <div className="game-buttons-container">
      <button
        className="game-buttons-back"
        onClick={() => location.replace("https://riwaj-wordle.netlify.app/")}
      >
        Back
      </button>
      <button
        className="game-buttons-new-game"
        onClick={() => location.reload()}
      >
        New Game
      </button>
    </div>
  );
}

export default GameButtons;
