import { currying } from "./javascript-based-problems/currying-4";

function sum(a, b, c, d) {
  return a + b + c + d;
}

let curriedSum = currying(sum);

console.log(curriedSum(1, 2, 3, 4));
console.log(curriedSum(1)(2, 3)(4));
console.log(curriedSum(1)(2)(3)(4));

const obj = {
  value: 10,
  method: currying(function (a, b) {
    return a + b + this.value;
  }),
};

// Here, "this" should be the obj
const result = obj.method(1, 2);
console.log(result);
