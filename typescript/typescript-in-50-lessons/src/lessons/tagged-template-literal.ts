const title = "A guide to @@starthl@@Ember@@endhl@@.js";

let markup = highlight`<li>${title}</li>`;

function highlight(strings: TemplateStringsArray, ...values: string[]) {
  let str = "";

  strings.forEach((templ, i) => {
    let expr = values[i] ?? "";
    if (expr) {
      expr = expr.replace("@@starthl@@", "<em>").replace("@@endhl@@", "</em>");
    }

    str += templ + expr;
  });

  return str;
}

console.log(markup);
