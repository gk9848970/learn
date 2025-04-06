/*
TEST IN FIFO ORDER

Input:
const asyncCallbacks = new QueueCallbacks();
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));

Output:
1 // this will execute first
2 // this will execute second
4 // this will execute after 2 seconds
5 // all of the remaining will execute after 1 second there after
6
6
7
8



TEST IN LIFO ORDER

Input:
const asyncCallbacks = new QueueCallbacks('LIFO');
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));

Output:
1 // this will execute first
2 // this will execute second
7 // this will execute after 5 seconds
6 // then this
5 // then this
4 // then this
6 // then this
8 // then this
*/

export const dummyApi = (i) => {
  return new Promise((res) => {
    setTimeout(() => res(i), i * 1000);
  });
};

export class QueueCallbacks {
  constructor(order = "FIFO") {
    this.order = order;
    this.queue = [];
    this.processing = 0;
  }

  process(promise) {
    if (this.processing < 2) {
      this.executePromise(promise);
      return;
    }

    if (this.queue.length < 6) {
      this.queue.push(promise);
    }
  }

  executePromise(promise) {
    this.processing += 1;

    promise
      .then((data) => console.log(data))
      .finally(() => {
        this.processing -= 1;
        if (this.queue.length === 0) return;

        const p = this.order === "FIFO" ? this.queue.shift() : this.queue.pop();
        this.executePromise(p);
      });
  }
}
