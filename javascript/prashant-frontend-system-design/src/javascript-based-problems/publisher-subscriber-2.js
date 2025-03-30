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
    this.set = new Set();
  }

  subscribe = (event, callback) => {
    if (this.events[event] === undefined) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
    console.log(this.events[event], "Subscribe");

    return {
      remove: () => {
        this.events[event] = this.events[event].filter(
          (handler) => handler != callback
        );

        console.log(this.events[event], "Subscribe remove");
      },
    };
  };

  publish = (event, ...args) => {
    if (this.events[event]) {
      this.events[event].forEach((handler) => {
        handler(...args);
      });

      this.events[event] = this.events[event].filter((handler) => {
        const doesSetHas = this.set.has(handler);
        if (doesSetHas) this.set.delete(handler);
        return doesSetHas ? false : true;
      });
    }

    console.log(this.events[event], "Publish");
  };

  publishAll = (...args) => {
    Object.keys(this.events).forEach((event) => this.publish(event, ...args));
    console.log(this.events, "Publish All");
  };

  subscribeOnce = (event, callback) => {
    if (this.events[event] === undefined) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
    this.set.add(callback);
  };

  subscribeOnceAsync = (...args) => {};
}
