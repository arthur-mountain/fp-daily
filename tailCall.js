/**
 * 非 tail-call
 * call stack 在每次 call frame 疊上去的時候，
 * 上一層的 call frame 沒辦法被釋放掉，因為要去記錄上一層的調用位置和變數等資訊
 * 直到最後一個 frame 結束，才會一層一層往上返回，直到最底下的 frame 被釋放，
 * 因為要記錄全部的 call frame，所以會被記作 O(n)
*/

// 在 g 函式執行時，f 函式沒辦法被釋放，因為要記錄調用位置及y變數的位置
// 即使 f 函式返回的 y 只是返回 g 函式的回傳結果
function f(x) {
  const y = g(x);
  return y;
}

// 在 g 函式執行時，f 函式同樣沒辦法被釋放，因為要 `+1` 的調用位置
function f(x) {
  return g(x) + 1;
}
// factorial範例，遞迴呼叫，因為每次返回的 n* 這個運算操作
// 導致外層 call frame 要去紀錄 `n*` 的調用位置，而不能被釋放
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

/**
 * tail-call
 * 確保每次返回的值，都只是函式調用，
 * 這樣就不用去記錄上一層的調用位置和變數等資訊，可以直接釋放掉上層 call frame
 * 因此不管如何去疊 call stack，上層的 call frame 都會被釋放，所以可以被記作 O(1)
*/

// factorial範例
// 方法一，將原本 n* 的運算，當作參數傳入，缺點是不直覺，為什麼計算factorial要戴 total，total 又是啥
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
// tailFactorial(5, 1);

// 方法二，透過一個正常形式的函式(tailFactorial2)，來執行 tail call
function tailFactorial2(n) {
  return tailFactorial(n, 1);
}
// tailFactorial2(5);

// 方法三，直接透過 ES6 預設值
function tailFactorial3(n, total = 1) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
// tailFactorial3(5);

/**
 * P.S.
 * ES6的默認有支持`tail-call 優化`，但只在嚴格模式下有效
 * 
 * 因為在正常模式下，函式內有兩個變數，會追蹤函式調用棧的資訊
 * argument: 返回當前函式的參數
 * func.caller: 返回當前函式的那個函式
 * 
 * tail-call 優化發生時，函式調用棧會被改寫，導致上述兩個變數會失效，
 * 而只有在嚴格模式下，這兩個變數才會被禁用
*/