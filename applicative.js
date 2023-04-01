/*************** applicative ******************/
// 若要把函式也封裝成 Context 呢? 需要再定義一種新的運算
// 定義 Functor 與 Functor 間的運算, 這就是 Applicative，也可以說是加強版的 Functor

// 傳入函式封裝成 Box
/*
 * example:
 *   Box(10)跟Box(20) 要做相乘後成為 Box(200).
 *   定義相乘這個運算行為即是 applicative, 將一個封裝過的函數運用到一個封裝的值上
 */
const Box = (f) => ({
  map: (g) => Box((x) => g(f(x))),
  fold: (x) => f(x),
  // applicative
  ap: (other) => Box((x) => other.map(f(x)).fold()),
});
Box.of = (value) => Box(() => value);

const f1 = Box.of(10);
const f2 = Box.of(20);
const multiply = (x) => (y) => x * y;
const r = f1.map(multiply).ap(f2).fold();
console.log(r);
