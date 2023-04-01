// A functor is simply `something(category)` that can `be mapped over`

/****************  範例一  *****************/
[1, 2, 3].map((x) => x.toString()); // ['1', '2', '3',]
// 輸入型別是 number[]，輸出型別是 string[]
// 所以也可以說是一個 Functor

/****************  範例二  *****************/
function fmap(fn) {
  return (data) => {
    let outputObj = {};
    for (const key of Object.keys(data)) {
      outputObj[key] = fn(data[key]);
    }
    return outputObj;
  };
}
const o2o = fmap((v) => v + 1);
console.log(o2o({ age: 22, grade: 10 })); // { age: 23, grade: 11 }
// 此時這裡的 Object 與 fmap 近似了 Functor 的概念，
// fmap(v => v + 1) 可以接受 number -> number，傳回 Object(number)-> Object(number)。

/****************  範例三  *****************/
const NumberBox = (number) => ({
  fmap: (fn) => NumberBox(fn(number)), //這裡是 fmap
  value: number,
});
/*
 * NumberBox 是個盒子 context (shape) 裡裝著一組數字 (Value) 符合 Something 的定義，
 * 若也滿足 can be map over(fmap) 特性, 就是一個 functor
 * P.S. 傳入一個函式改變內部的資料，但維持外殼不變
 */

// Functor 必須滿足
/*
 * 1. 單元律:
 *   a.map(x => x) === a
 */

/*
 * 2. 保存`原有數據`結構(可组合):
 *   a.map(x => f(g(x))) === a.map(g).map(f)
 */

/*
 * 3. 提供接口往裡面塞值:
 *   Effect.of = (value) => Effect(() => value)
 */
