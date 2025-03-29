import { removeCycle } from "./javascript-based-problems/remove-cycle";

let obj1 = { name: "A" };
let obj2 = { name: "B" };
let obj3 = { name: "C" };
let obj4 = { name: "D" };

// Introduce complex references
obj1.child = obj2;
obj2.child = obj3;
obj3.child = obj4;
obj4.child = obj2; // Indirect cycle (obj4 → obj2)

// Direct self-cycle
obj1.self = obj1;

// // Shared reference (non-cycle, should remain)
let sharedObj = { name: "Shared" };
obj2.shared = sharedObj;
obj3.shared = sharedObj;

// Apply cycle removal
removeCycle(obj1);
console.log(JSON.stringify(obj1, null, 2));
