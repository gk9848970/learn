/* 
Flat

console.log([1, 2, [3, 4]].flat());
//[1, 2, 3, 4]

console.log([1, 2, [3, 4]].flat(1));
//[1, 2, 3, 4]

console.log([1, [[[2]]], [3, 4], [[5]]].flat(2));
//[1, [2], 3, 4, 5]

console.log([[[[[[1, [1]], 2, 3]]]], [4, 5]].flat(Infinity));
//[1, 1, 2, 3, 4, 5]

console.log([1, 2, [3, 4]].flat(0));
//[1, 2, [3, 4]]

Flatmap

console.log(["Gaurav", "Khyati"].map((e) => [e]));
// [["Gaurav"], ["Khyati"]]

console.log([["Gaurav"], ["Khyati"]].flat(1));
// ["Gaurav", "Khyati"]

// flatMap = map -> flat with depth 1
console.log(["Gaurav", "Khyati"].flatMap((e) => [e]));
// ["Gaurav", "Khyati"]

*/

Array.prototype.flattenArray = function (depth = 1) {
  return this.reduce((result, curr) => {
    if (Array.isArray(curr) && depth > 0) {
      const flattenChild = curr.flattenArray(depth - 1);
      result.push(...flattenChild);
    } else {
      result.push(curr);
    }

    return result;
  }, []);
};
