/*
function message() {
  console.log("hello");
}

const sample = sampler(message, 4);
sample();
sample();
sample();
sample(); // this will be executed
sample();
sample();
sample();
sample(); // this will be executed


const obj = {
  name: "Gaurav",
  message(msg) {
    console.log(`Hello, ${this?.name}`, msg);
  },
};

const sample = sampler(obj.message, 3, obj);

sample("Khyati");
sample("Khyati");
sample("Khyati1"); // This should log "Hello, Gaurav"
sample("Khyati");
sample("Khyati");
sample("Khyati2"); // This should log "Hello, Gaurav"
*/

export function sampler(callback, limit, context) {
  let count = 0;

  return function (...args) {
    count++;
    if (count < limit) return;

    callback.apply(context ?? this, args);
    count = 0;
  };
}
