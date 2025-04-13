import {
  customSetTimeout,
  clearAllTimeouts,
} from "./javascript-based-problems/clear-all-timeouts";

const id1 = customSetTimeout(() => {
  console.log("hello 1");
}, 1000);

console.log({ id1 });

const id2 = customSetTimeout(() => {
  console.log("hello 2");
}, 1000);

console.log({ id2 });

clearAllTimeouts();

// Output
// Only ids no Hello
