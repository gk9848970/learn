/*
function Counter(){
  return <button>Count</button>
}

function Welcome() {
  return <div>
    <header>Hiiii</header>
    <Counter/>
  </div>
}

Becomes,

function Counter(){
  return DOMcreateElement("button", null, "Count")
}

function Welcome() {
  return DOMcreateElement("div", null,
    DOMcreateElement("header", null, "Hiiii"),
    DOMcreateElement(Counter, null)  // ← Counter as a function reference!
  )
}

App -> <Welcome/>

Becomes,
DOMcreateElement(Welcome, null, ...children)
DOMparseNode("div", null, children)
where, children = [
  DOMcreateElement("header", null, "Hiiii"),  // ← Not evaluated yet!
  DOMcreateElement(Counter, null)             // ← Not evaluated yet!
]

Now, DOMcreateElement("header", null, "Hiiii")
Becomes, DOMparseNode("header", null, ["Hiiii"])
Finally, <header>Hiiii</header>

And, DOMcreateElement(Counter, null)
Becomes, DOMcreateElement("button", null, "Count")
Then, DOMparseNode("button", null, ["Count"])
Finally, <button>Count</button>

Ultimately, the DOM will look like this:
DOMparseNode("div", null, <header>Hiiii</header>, <button>Count</button>)

Which becomes,
<div>
  <header>Hiiii</header>
  <button>Count</button>
</div>
*/

export function DOMcreateElement(element, properties, ...children) {
  if (typeof element === "function") {
    return element({
      ...nonNull(properties, {}),
      children,
    });
  }
  return DOMparseNode(element, properties, children);
}

/**
 * A helper function that ensures we won't work with null values
 */
function nonNull(val, fallback) {
  return Boolean(val) ? val : fallback;
}

function DOMparseNode(element, properties, children) {
  const el = Object.assign(document.createElement(element), properties);
  DOMparseChildren(children).forEach((child) => {
    el.appendChild(child);
  });
  return el;
}

function DOMparseChildren(children) {
  return children.map((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return document.createTextNode(child);
    }
    return child;
  });
}
