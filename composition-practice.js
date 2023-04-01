const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);
/******************   utils 原生js *****************/
const toUpper = (s) => s.toUpperCase();
const toLower = (s) => s.toLowerCase();
const split = (delimiter) => (s) => s.split(delimiter);
const trim = (s) => s.trim();
const reverse = (arr) => [...arr].reverse();
const map = (fn) => (arr) => arr.map(fn);
const filter = (fn) => (arr) => arr.filter(fn);
const joinTo = (delimiter) => (arr) => arr.join(delimiter);
const isStrGtThan = (len) => (s) => s.length > len;
const tail = (arr) => arr.at(-1);
const head = (arr) => arr[0];
const prop = (key) => (data) => data[key];

/******************   題目一 *****************/
const doStuffFp = (str) => {
  return compose(
    joinTo(" "),
    filter(isStrGtThan(3)),
    map(trim),
    reverse,
    split(" "),
    toLower
  )(str);
};

console.log("1. doStuffFp: \n", doStuffFp("Welcome to FP world"));

/******************   題目二 *****************/
// Example Data
const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

const isLastInStock = (cars) => {
  return compose(prop("in_stock"), tail)(cars);
};
console.log("2. isLastInStock: \n", isLastInStock(CARS)); // false
const findFirstCar = (cars) => {
  return compose(prop("name"), head)(cars);
};
console.log("3. first car: \n", findFirstCar(CARS)); // false

/******************   題目三 *****************/
const add = (a) => (b) => a + b;
const reduce = (fn) => (x) => (data) => data.reduce(fn, x);
// 用pipe and _average 改寫
const _average = (xs) => {
  return reduce((a, b) => add(a)(b))(0)(xs) / xs.length;
}; // <- leave be

const averageDollarValue = (cars) => {
  return pipe(map(prop("dollar_value")), _average)(cars);
};

console.log("4. average dollars: \n", averageDollarValue(CARS)); // 790700
