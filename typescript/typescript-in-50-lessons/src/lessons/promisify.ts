// Make the callback type more specific
type FunctionWithCallback = (...args: [...any[], (result: any) => any]) => any;

type InferArguments<T> = T extends (
  ...args: [...infer R, (result: any) => any]
) => any
  ? R
  : never;

type InferResults<T> = T extends (
  ...args: [...any[], (result: infer R) => any]
) => any
  ? R
  : never;

type PromisifiedFunction<T extends FunctionWithCallback> = (
  ...args: InferArguments<T>
) => Promise<InferResults<T>>;

function promisify<Fun extends FunctionWithCallback>(
  f: Fun
): PromisifiedFunction<Fun> {
  return function (...args: InferArguments<Fun>) {
    return new Promise<InferResults<Fun>>((resolve) => {
      function callback(result: InferResults<Fun>) {
        resolve(result);
      }
      const argsWithCallback = [...args, callback] as any;
      f(...argsWithCallback);
    });
  };
}

// Test case
declare function addAsync(
  x: number,
  y: number,
  cb: (result: number) => void
): void;

const addProm = promisify(addAsync);
