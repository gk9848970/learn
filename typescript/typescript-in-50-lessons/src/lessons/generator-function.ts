function* generateStuff() {
  yield 1;
  yield 2;
  const proceed1 = yield 3;
  const proceed2 = yield proceed1;
  yield proceed2;
  return "done";
}

// In use:
const generator = generateStuff();
console.log(generator.next().value); // logs 1
console.log(generator.next().value); // logs 2
console.log(generator.next().value); // logs 3
// The door is open, we pass true through and...
console.log(generator.next("Gaurav").value); // logs 4
console.log(generator.next("Kumar").value); // 'done”
console.log(generator.next().value); // done
console.log(generator.next().value); // undefined
