type SearchFn = (
  query: string,
  tags?: string[] | undefined
) => Promise<string[]>;

declare function displaySearch(
  inputId: string,
  outputId: string,
  search: SearchFn
): void;

// Function with exact parameters
displaySearch("input", "output", async (input, tags) => {
  return [input, ...(tags || [])];
});

const funtionWithExactParams = async (input: string, tags: string[]) => {
  return [input, ...tags];
};

// Tags is required above
displaySearch("input", "output", funtionWithExactParams);

// Function with less parameters
displaySearch("input", "output", (input) => {
  return Promise.resolve([input]);
});

displaySearch("input", "output", () => {
  return Promise.resolve(["result1", "result2"]);
});

// Function with extra parameters
const funtionWithExtraParams = async (
  input: string,
  tags?: string[],
  hashtags?: string[]
) => {
  return [input, ...(tags || []), ...(hashtags || [])];
};

displaySearch("input", "output", funtionWithExtraParams);

// Function with different return types, When our return type is void anything can be returned
declare function displayResults(
  inputId: string,
  outputId: string,
  search: (results: string[]) => void
): void;

//
function searchResults1(results: string[]) {
  console.log(results);
}

function searchResults2(results: string[]): number {
  return results.length;
}

function searchResults3(results: string[]): undefined {
  console.log(results);
}

displayResults("input", "output", searchResults1);
displayResults("input", "output", searchResults2);
displayResults("input", "output", searchResults3);

// Function with different return types, When our return type is something defined
declare function showResults(
  inputId: string,
  outputId: string,
  search: (results: string[]) => number
): void;

function searchResults4(results: string[]) {
  console.log(results);
}

function searchResults5(results: string[]): number {
  return results.length;
}

showResults("input", "output", searchResults4);
showResults("input", "output", searchResults5);

// Function with undefined return type, Doesn't even accept void return type
declare function showResults2(
  inputId: string,
  outputId: string,
  search: (results: string[]) => undefined
): void;

function searchResults6(results: string[]) {
  console.log(results);
}

showResults2("input", "output", searchResults6);

// The return type is undefined due to explicit JS void, Else it would have been number i.e. return type of search
export function showResults3(
  inputId: string,
  outputId: string,
  search: (results: string[]) => number
) {
  return void search([inputId, outputId]);
}
