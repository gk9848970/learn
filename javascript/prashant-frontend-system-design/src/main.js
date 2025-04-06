import {
  dummyApi,
  QueueCallbacks,
} from "./javascript-based-problems/async-callbacks-engine";

// const asyncCallbacks = new QueueCallbacks();
// asyncCallbacks.process(dummyApi(1));
// asyncCallbacks.process(dummyApi(2));
// asyncCallbacks.process(dummyApi(6));
// asyncCallbacks.process(dummyApi(4));
// asyncCallbacks.process(dummyApi(5));
// asyncCallbacks.process(dummyApi(6));
// asyncCallbacks.process(dummyApi(7));
// asyncCallbacks.process(dummyApi(8));
// asyncCallbacks.process(dummyApi(9));
// asyncCallbacks.process(dummyApi(10));

const asyncCallbacks = new QueueCallbacks("LIFO");
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));
