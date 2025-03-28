/*
Implement an analytics SDK that exposes log events, it takes in events and queues them, and then starts sending the events. 

The SDK should adhere the following properties.
• Send each event after a delay of 1 second and this logging fails every n % 5 times.
• Send the next event only after the previous one resolves.
• When the failure occurs attempt a retry.

Input:
const sdk = new SDK();
sdk. logEvent ("event 1"); 
sdk. logEvent ("event 2");
 sdk. logEvent ("event 3"); 
 sdk. logEvent ("'event 4"); 
 sdk. logEvent ("event 5");
sdk. logEvent ("event 6"); 
sdk. logEvent ("'event 7"); 
sdk. logEvent ("event 8"); 
sdk. logEvent ("event 9"); 
 sdk. logEvent ("event 10");
sdk. send (;
Output:
"Analytics sent event 1"
"Analytics sent event 2"
"Analytics sent event 3"
"Analytics sent event 4"
"Failed to send event 5"
"Retrying sending event 5"
"Analytics sent event 5"
"Analytics sent event 6"
"Analytics sent event 7"
"Analytics sent event 8"
"Failed to send event 9"
"Retrying sending event 9"
"Analytics sent event 9"
"Analytics sent event 10"
*/

export const SDK = function () {
  this.queue = [];
  this.signalCount = 0;
  this.currentIndex = 0;

  this.logEvent = (message) => {
    this.queue.push(message);
  };

  this.send = () => {
    this.signalCount += 1;
    if (this.currentIndex === this.queue.length) return;
    const current = this.queue[this.currentIndex];

    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        this.signalCount % 5 === 0 ? rej(current) : res(current);
      }, 1);
    });

    promise
      .then((data) => {
        console.log("Analytics " + data);
        this.currentIndex += 1;
      })
      .catch((data) => {
        console.log("Failed to " + data);
        console.log("Retrying " + data);
      })
      .finally(() => this.send());
  };
};
