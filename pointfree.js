// notice: use ramba libary is better way
// source: https://ithelp.ithome.com.tw/articles/10239709
/*
 *  curry, commpose, pipe ||
 *  Ramda 的auto curry 與 "Function first，Data last"
 *  更很容易寫出 Pointfree Style 的程式碼。
 */
const R = {
  pipe:
    (...fns) =>
    (data) =>
      fns.reduce((v, f) => f(v), data),
  prop: (key) => (data) => data[key],
  filter: (fn) => (data) => data.filter(fn),
};
const isWorker = (s) => s === "worker";
const propRole = R.prop("role");
const getWorkers = R.filter(R.pipe(propRole, isWorker));

const data = [
  { name: "张三", role: "worker" },
  { name: "李四", role: "worker" },
  { name: "王五", role: "manager" },
];

console.log(getWorkers(data));
// [
//   {"name": "张三", "role": "worker"},
//   {"name": "李四", "role": "worker"}
// ]

/*
定義 getWorkers 的时候，完全没有提到 data，这就是 Pointfree。
*/
