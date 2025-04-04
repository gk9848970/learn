/*
const events = new Events();

const newUserNewsSubscription = events.subscribe("new-user", function (payload) {
  console.log(`Sending Q1 News to: ${payload}`);
});

events.publish("new-user", "Jhon");

//output: "Sending Q1 News to: Jhon"

const newUserNewsSubscription2 = events.subscribe("new-user", function (payload) {
  console.log(`Sending Q2 News to: ${payload}`);
});

events.publish("new-user", "Doe");

//output: "Sending Q1 News to: Doe"
//output: "Sending Q2 News to: Doe"

newUserNewsSubscription.remove(); // Q1 news is removed

events.publish("new-user", "Foo");
//output: "Sending Q2 News to: Foo"

events.publishAll("FooBar");
//output: "Sending Q2 News to: FooBar"

events.subscribeOnce("new-user", function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once");
//output: "Sending Q2 News to: Foo Once" - normal event
//output: "I am invoked once Foo Once" - once event

events.publish("new-user", "Foo Twice");
//output: "Sending Q2 News to: Foo Twice" - normal event
// once event should not invoke for second time
*/

export class Events {
  constructor() {
    this.events = {};
    this.onceEvents = {};
    this.asyncEvents = {};
  }

  subscribe = (event, callback) => {
    if (this.events[event] === undefined) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    return {
      remove: () => {
        this.events[event] = this.events[event].filter(
          (handler) => handler != callback
        );
      },
    };
  };

  publish = (event, ...args) => {
    this.publishNormalEvents(event, ...args);
    this.publishOnceEvents(event, ...args);
    this.publishAsyncEvents(event, ...args);
  };

  publishNormalEvents = (event, ...args) => {
    if (this.events[event]) {
      this.events[event].forEach((handler) => handler(...args));
    }
  };

  publishOnceEvents = (event, ...args) => {
    if (this.onceEvents[event]) {
      this.onceEvents[event].forEach((handler) => handler(...args));
      this.onceEvents[event] = [];
    }
  };

  publishAsyncEvents = (event, ...args) => {
    if (this.asyncEvents[event]) {
      this.asyncEvents[event].forEach((handler) => handler(...args));
      this.asyncEvents[event] = [];
    }
  };

  publishAll = (...args) => {
    Object.keys(this.events).forEach((event) =>
      this.publishNormalEvents(event, ...args)
    );

    Object.keys(this.onceEvents).forEach((event) =>
      this.publishOnceEvents(event, ...args)
    );

    Object.keys(this.asyncEvents).forEach((event) =>
      this.publishAsyncEvents(event, ...args)
    );
  };

  subscribeOnce = (event, callback) => {
    if (this.onceEvents[event] === undefined) {
      this.onceEvents[event] = [];
    }

    this.onceEvents[event].push(callback);
  };

  subscribeOnceAsync = (event) => {
    if (this.asyncEvents[event] === undefined) {
      this.asyncEvents[event] = [];
    }

    return new Promise((res) => {
      this.asyncEvents[event].push(res);
    });
  };
}
