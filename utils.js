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
  let result_arr = [...try_word_arr];
  let answer_arr_org = [...answer_arr];

  for (let j = 0; j < answer_arr_org.length * 3; j++) {
    let i = j % answer_arr.length;
    let l = try_word_arr[i];
    if (j < answer_arr.length && indicesOf(answer_arr_org, l).includes(i)) {
      result_arr[i] = 2;
    } else if (
      j > answer_arr.length &&
      result_arr[i] != 2 &&
      result_arr[i] != 1 &&
      answer_arr
        .filter((el, index) => result_arr[index] != 2 && result_arr[index] != 1)
        .includes(l)
    ) {
      result_arr[i] = 1;
    } else if (
      j >= answer_arr.length * 2 &&
      result_arr[i] != 2 &&
      result_arr[i] != 1
    ) {
      result_arr[i] = 0;
    }
  }

  return result_arr;
};
export { validate };
