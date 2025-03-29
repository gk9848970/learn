import { sampler } from "./javascript-based-problems/sampler";

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
