import { getElementsByStyle } from "./javascript-based-problems/get-elements-by-style";

const answer = getElementsByStyle(
  document.getElementById("root"),
  "paddingTop",
  "10px"
);

console.log(answer);
