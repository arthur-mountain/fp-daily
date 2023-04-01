// 1. functions
// 2. data
// 3. data as initialValue, 從左至右將 data 帶入 function,
//    直接回傳 function 的回傳值, 作為下一次 function 的參數
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
// compose 同上, 不過是從右至左
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

// Input: str = 'hello world'
// Output: 'HELLO WORLD!'
/**
 * @param {String} str
 * @return {String}
 */
const isString = (s) => (typeof s === "string" ? s : "no string");
const toUpper = (s) => s.toUpperCase();
const toLower = (s) => s.toLowerCase();
const exclaim = (s) => `${s}!`;
// const transform1 = (str) => toUpper(str);
const transform1WithCompose = compose(exclaim, toUpper, isString);
const transform1WithPipe = pipe(isString, toUpper, exclaim);

// Input: str = 'hello world'
// Output: 'hello world!'
/**
 * @param {String} str
 * @return {String}
 */

// const transform2 = (str) => exclaim(toLower(str));
const transform2WithCompose = compose(exclaim, toLower, isString);
const transform2WithPipe = pipe(isString, toUpper, exclaim);

const str = "hellow word";

console.log("compose: ", transform1WithCompose(str));
console.log("compose: ", transform2WithCompose(str));
console.log("pipe: ", transform1WithPipe(str));
console.log("pipe: ", transform2WithPipe(str));

/*******************************************/
const split = (delimiter) => (s) => s.split(delimiter);
const trim = (s) => s.trim();
const reverse = (arr) => [...arr].reverse();
const map = (fn) => (arr) => arr.map(fn);
const filter = (fn) => (arr) => arr.filter(fn);
const isGtThan = (len) => (s) => s.length > len;
const joinTo = (delimiter) => (arr) => arr.join(delimiter);

const doStuffFp = (str) => {
  return compose(
    joinTo(" "),
    filter(isGtThan(3)),
    map(trim),
    reverse,
    split(" "),
    toLower
  )(str);
};

console.log("doStuffFp\n", doStuffFp("Welcome to FP world"));
