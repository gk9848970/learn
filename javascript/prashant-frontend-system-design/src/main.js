import { Move } from "./javascript-based-problems/publisher-subscriber-1";

const moveHandler = function (item) {
  console.log("fired: " + item);
};

// 2nd observer
const moveHandler2 = function (item) {
  console.log("Moved: " + item);
};

const move = new Move();

// subscribe 1st observer
move.subscribe(moveHandler);
move.fire("event #1");

// unsubscribe 1st observer
move.unsubscribe(moveHandler);
move.fire("event #2");

// subscribe 1st & 2nd observer
move.subscribe(moveHandler);
move.subscribe(moveHandler2);
move.fire("event #3");
