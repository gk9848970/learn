// type SearchFn = (
//   query: string,
//   tags?: string[] | undefined
// ) => Promise<string[]>;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <form action="/search" method="POST">
    <label for="search">Search the site</label>
    <input type="search" id="search">
    <button type="submit">Submit</button>
  </form>
  <div id="output" hidden>
  </div>
`;

function inputChangeHandler(this: HTMLElement) {
  console.log(this.value, "Inside separate function");
  this.parentElement?.classList.add("active");
}

function displaySearch(inputId: string): void {
  const input = document.getElementById(inputId);
  input?.addEventListener("change", function () {
    this.parentElement?.classList.add("active");
    console.log(this.value, "Outside");
    if (this instanceof HTMLInputElement) {
      console.log(this.value, "Inside of instanceof");
    }
  });

  input?.addEventListener("change", inputChangeHandler);
}

displaySearch("search");
