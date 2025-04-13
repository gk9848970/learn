/*
import {
  customSetTimeout,
  clearAllTimeouts,
} from "./javascript-based-problems/clear-all-timeouts";

const id1 = customSetTimeout(() => {
  console.log("hello");
}, 1000);

console.log({ id1 });

const id2 = customSetTimeout(() => {
  console.log("hello");
}, 1000);

console.log({ id2 });

clearAllTimeouts();

// Output
// Only ids no Hello
 */

const timeoutIds = [];

export const customSetTimeout = (callback, delay) => {
  const id = setTimeout(callback, delay);
  timeoutIds.push(id);
  return id;
};

export const clearAllTimeouts = () => {
  timeoutIds.forEach((id) => clearTimeout(id));
};
