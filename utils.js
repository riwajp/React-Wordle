const indicesOf = (arr, el) => {
  let c = [];
  for (let i in arr) {
    if (arr[i] == el) {
      c.push(parseInt(i));
    }
  }
  return c;
};
const validate = (answer, try_word) => {
  let try_word_arr = try_word.split("");
  let answer_arr = answer.split("");
  let answer_arr_temp = [...answer_arr];
  let result_arr = Array(try_word_arr.length);
  result_arr.fill(0);

  for (let index in try_word_arr) {
    let letter = try_word_arr[index];
    if (indicesOf(answer_arr_temp, letter).includes(parseInt(index))) {
      result_arr[index] = 2;
      answer_arr_temp[index] = "";
    }
  }

  for (let index in try_word_arr) {
    let letter = try_word_arr[index];

    if (answer_arr_temp.includes(letter)) {
      result_arr[index] = 1;
      answer_arr_temp[answer_arr_temp.indexOf(letter)] = "";
    }
  }

  return result_arr;
};

export { validate };
