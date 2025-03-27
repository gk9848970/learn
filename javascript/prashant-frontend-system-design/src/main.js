import { highestCommodityPriceWithCheckpoint } from "./javascript-based-problems/highest-commodity-price.js";

console.log(
  highestCommodityPriceWithCheckpoint({
    data: [
      { timestamp: 1, price: 1 },
      { timestamp: 1, price: 4 },
      { timestamp: 1, price: 2 },
      { timestamp: 1, price: 2, checkpoint: "a" },
      { timestamp: 1, price: 6 },
      { timestamp: 1, price: 7 },
      { timestamp: 1, price: 8, checkpoint: "b" },
    ],
    queries: [
      { timestamp: 1, checkpoint: "a" },
      { timestamp: 1, checkpoint: "b" },
    ],
  })
);
