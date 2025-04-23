/*
console.log(classNames("foo", "bar")); // => 'foo bar'
console.log(classNames("foo", { bar: true })); // => 'foo bar'
console.log(classNames({ "foo-bar": true })); // => 'foo-bar'
console.log(classNames({ "foo-bar": false })); // => ''
console.log(classNames({ foo: true }, { bar: true })); // => 'foo bar'
console.log(classNames({ foo: true, bar: true })); // => 'foo bar'

// lots of arguments of various types
console.log(
  classNames("foo", { bar: true, duck: false }, "baz", { quux: true })
); // => 'foo bar baz quux'

// other falsy values are just ignored
console.log(classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "")); // => 'bar 1'

const arr = ["b", { c: true, d: false }];
console.log(classNames("a", arr)); // => 'a b c'

let buttonType = "primary";
console.log(classNames({ [`btn-${buttonType}`]: true })); // => 'btn-primary'
*/

const addWithSpace = (prefix, suffix) => {
  return prefix === "" ? suffix : ` ${suffix}`;
};

export const classNames = (...args) => {
  let result = "";

  args.forEach((arg) => {
    if (arg === undefined || arg === null || arg === "" || arg === 0) {
      return;
    } else if (typeof arg === "string") {
      result += addWithSpace(result, arg);
    } else if (typeof arg === "number") {
      result += addWithSpace(result, arg.toString());
    } else if (typeof arg === "object") {
      if (Array.isArray(arg)) {
        const arrayClassNames = classNames(...arg);
        if (arrayClassNames) {
          result += addWithSpace(result, arrayClassNames);
        }
      } else {
        const validClassNames = Object.keys(arg).filter((key) =>
          Boolean(arg[key])
        );
        if (validClassNames.length > 0) {
          const arrayClassNames = classNames(...validClassNames);
          result += addWithSpace(result, arrayClassNames);
        }
      }
    }
  });

  return result;
};
