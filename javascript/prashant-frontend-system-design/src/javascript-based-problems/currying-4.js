/*
function sum(a, b, c, d) {
  return a + b + c + d;
}

let curriedSum = curry(sum);

console.log(curriedSum(1,2,3,4,5)); // 10
console.log(curriedSum(1)(2,3)(4,5)); // 10
console.log(curriedSum(1)(2)(3)(4)); // 10

const obj = {
  value: 10,
  method: currying(function(a, b) {
    return a + b + this.value;
  })
};

// Here, "this" should be the obj
const result = obj.method(1)(2);

*/

export function currying(fn) {
  return function curry(...args) {
    const context = this;

    if (args.length >= fn.length) {
      return fn.apply(context, args);
    }

    return function (...args2) {
      return curry.apply(context, [...args, ...args2]);
    };
  };
}
