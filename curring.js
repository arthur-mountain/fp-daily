const curry = (fn) =>
  (curried = (...args) => {
    // 若參數傳遞完畢, 帶入 actully function
    if (args.length >= fn.length) return fn(...args.slice(0, fn.length));
    // 若參數不完全, 將參數帶入curried(name function)並回傳新函式
    if (fn.length !== args.length) return curried.bind(null, ...args);
  });

// Input: str = 'Jingle bells Batman'
// Output: ['Jingle', 'bells', 'Batman']

/**
 * @param {string} str
 * @return {array}
 */
const getStrArrByDelimiter = curry((delimiter, string) =>
  string.split(delimiter)
);
console.log(getStrArrByDelimiter(" ")("Jingle bells Batman"));

// Input: str = ['Jingle bells Batman', 'Robin laid an egg']
// Output: [['Jingle', 'bells', 'Batman'], ['Robin', 'laid', 'an', 'egg']]

/**
 * @param {array} arr
 * @return {array}
 */
const sentences = (arr) => arr.map(getStrArrByDelimiter(" "));
console.log(sentences(["Jingle bells Batman", "Robin laid an egg"]));
