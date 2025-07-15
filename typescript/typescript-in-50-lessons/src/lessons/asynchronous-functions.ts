declare function searchPromise(
  term: string,
  ...tags: string[]
): Promise<string>;

// Wrong
declare async function searchPromise(term: string, ...tags: string[]): string;
