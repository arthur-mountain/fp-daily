// function 輸入一個 input 然後得到 output
const add = (x) => x + 3;
add(2); // 5

// 若要包成一個 box, 需要重新定義一種運算(map)能接受 Functor 當作輸入參數
const Box = (x) => ({
  map: (f) => Box(f(x)), // 透過 map 運算, 再把運算結果放入新的 Box2 後回傳
  fold: (f) => f(x), // 取值 remove from the box
});

const result = Box(2) // 回傳一個 Box
  .map((x) => x + 3); // 透過原Box運算後, 回傳全新的 Box(5)

const result2 = Box(2).fold((x) => x + 3); // 透過原Box運算後直接取值, 5

/*
 * 讓 Value 維持在 Box 裡面，但仍然可以擁有一些 State 跟 method (像 OOP 的 class).
 * Box 可以自己實作運算函式,達成抽象化, 雖說 class 可以直接實作 State and Method,
 * 但仍就多出一種解法, 同一個問題你可以用多種方式方式達成
 * 用 Box 好處是不用去管理 State 的狀態, 因為每次運算完, 都只回傳包含`運算結果`的 Box
 */

// example
/*
 * @parmas {value} x
 */
const Box2 = (x) => ({
  map: (f) => Box2(f(x)),
  value: x, // 取值
});

Box2("a").map((x) => x.toUpperCase()).value; //'A'
// 其中這一段 `x => x.toUpperCase()`,
// `x 在使用完畢後就會消失`，因此不用煩惱現在 x 到底是多少，
// 但該 state 狀態會一直存在(因為有回傳一個`包含運算結果的新Box`)
// 只需要去記憶現在的狀態結果。
