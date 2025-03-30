/*
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
move.fire('event #1');

// unsubscribe 1st observer
move.unsubscribe(moveHandler);
move.fire('event #2');

// subscribe 1st & 2nd observer
move.subscribe(moveHandler);
move.subscribe(moveHandler2);
move.fire('event #3');

Output:
"fired: event #1"

"fired: event #3"

"Moved: event #3"
*/

export class Move {
  constructor() {
    this.handlers = [];
  }

  fire = (event) => {
    this.handlers.forEach((handler) => handler(event));
  };

  subscribe = (callback) => {
    this.handlers.push(callback);
  };

  unsubscribe = (callback) => {
    this.handlers = this.handlers.filter((h) => h != callback);
  };
}
