/*
Given a list of timestamps and commodity prices, find out highest commodity price at given timestamp. timestamps are not necessarily in sorted order, there can be multiple entries for a timestamp as well.

data: [
    { timestamp: 1, price: 1 },
    { timestamp: 1, price: 4 },
    { timestamp: 1, price: 2 },
  ],
  queryTimestamp: 1,

*/

export const highestCommodityPrice = ({ data, queryTimestamp }) => {
  const map = new Map();

  data.forEach(({ timestamp, price }) => {
    if (map.has(timestamp) === false || map.get(timestamp) < price) {
      map.set(timestamp, price);
    }
  });

  return map.get(queryTimestamp);
};

/*
Given a list of timestamps and commodity prices, find out highest commodity price at given timestamp. timestamps are not necessarily in sorted order, there can be multiple entries for a timestamp as well.

data: [
    { timestamp: 1, price: 1 },
    { timestamp: 1, price: 4 },
    { timestamp: 1, price: 2 },
    { timestamp: 1, price: 2, checkpoint: 'a' },
    { timestamp: 1, price: 6 },
    { timestamp: 1, price: 7 },
    { timestamp: 1, price: 8, checkpoint: 'b' },
  ],
  query: { timestamp: 1, checkpoint: 'a' } -> 4
  query: { timestamp: 1, checkpoint: 'b' } -> 8

*/

export const highestCommodityPriceWithCheckpoint = ({ data, queries }) => {
  const map = new Map();
  const checkpointMap = new Map();

  data.forEach(({ timestamp, price, checkpoint }) => {
    if (map.has(timestamp) === false || map.get(timestamp) < price) {
      map.set(timestamp, price);
    }

    if (checkpoint) {
      if (!checkpointMap.get(timestamp)) {
        checkpointMap.set(timestamp, {});
      }

      const checkpointObj = checkpointMap.get(timestamp);

      checkpointObj[checkpoint] = map.get(timestamp);
    }
  });

  return queries.map(({ timestamp, checkpoint }) => {
    const checkpointObj = checkpointMap.get(timestamp);
    return checkpointObj[checkpoint];
  });
};
