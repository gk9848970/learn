export const delayPromise = <T>(promsie: Promise<T>, ms: number) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      promsie.then(resolve).catch(reject);
    }, ms);
  });
};
