function Letter({ letter, index, answer, done }) {
  var className = "letter-container ";
  if (done) {
    if (letter == answer[index]) {
      className += "correct-place ";
    } else if (answer.includes(letter)) {
      className += "not-correct-place ";
    }
  }
  if (letter != "") {
    className += " letter-filled";
  }

  return <div className={className}>{letter}</div>;
}

export default Letter;
