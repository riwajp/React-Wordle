import Letter from "./Letter";

function Word({ word, answer }) {
  return (
    <div className="word-container">
      {answer.split("").map((letter, i) => (
        <Letter letter={word.length > i ? word[i] : ""} />
      ))}
    </div>
  );
}

export default Word;
