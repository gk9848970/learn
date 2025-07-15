// For normal functions
function search(term: string, tags?: string[]): void;

function search(term: string, callback: () => void, tags?: string[]): void;

function search(term: string, p1?: (() => void) | string[], p2?: string[]) {
  const callback = typeof p1 === "function" ? p1 : undefined;

  const tags =
    typeof p1 !== undefined && Array.isArray(p1)
      ? p1
      : typeof p2 !== undefined && Array.isArray(p2)
      ? p2
      : [];

  let queryString = `?query=${term}`;

  if (tags.length) {
    console.log("Tags are given");
    queryString += `&tags=${tags.join()}`;
  }

  if (callback) {
    callback();
  } else {
    console.log("callback is not a function");
  }

  console.log(queryString);
}

// For arrow functions

type SearchFn = {
  (term: string, tags?: string[]): void;
  (term: string, callback: () => void, tags?: string[]): void;
};

const searchArrowFn = (
  term: string,
  p1?: (() => void) | string[],
  p2?: string[]
) => {
  const callback = typeof p1 === "function" ? p1 : undefined;

  const tags =
    typeof p1 !== undefined && Array.isArray(p1)
      ? p1
      : typeof p2 !== undefined && Array.isArray(p2)
      ? p2
      : [];

  let queryString = `?query=${term}`;

  if (tags.length) {
    console.log("Tags are given");
    queryString += `&tags=${tags.join()}`;
  }

  if (callback) {
    callback();
  } else {
    console.log("callback is not a function");
  }

  console.log(queryString);
};

console.log(1);
search("Batman");
console.log(2);
search("Batman", ["Superhero", "DC"]);
console.log(3);
search("Batman", () => console.log("Batman callback"));
console.log(4);
search("Batman", () => console.log("Batman callback"), ["Superhero", "DC"]);
console.log(5);
