/*
Input:
const List = function(val){
  this.next = null;
  this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;

removeCycle(item1);
console.log(item1);

Output:
/*
{val: 10, next: {val: 20, next: {val: 30}}}
*/

export function removeCycle(item) {
  let current = item;
  const weakset = new WeakSet();

  while (current) {
    if (weakset.has(current.next)) {
      delete current.next;
    }
    weakset.add(current);
    current = current.next;
  }
}
