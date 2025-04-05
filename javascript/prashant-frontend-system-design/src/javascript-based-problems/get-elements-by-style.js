/*
Input:
<div id="root">
  <div class="alpha"></div>
  <div class="beta"></div>
  <div class="gamma"></div>
</div>
<styles>

#root {
  display: flex;
  gap: 8px;
}

#root > div{
  border: 1px solid;
  width: 50px;
  height: 50px;
}

.alpha{
  padding: 10px 10px;
  background-color: red;
  border-style: dotted !important;
}

.beta{
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: #000;
}

.gamma{
  padding: 10px 0 0;
  background-color: rgb(255,0,0);
}
</styles>

<script>
console.log(getElementsByStyle(document.getElementById("root"), 'paddingTop', '10px'));
</script>

Output:
[<div class="alpha"></div>,<div class="beta"></div>,<div class="gamma"></div>]
*/

export const getElementsByStyle = (root, property, value) => {
  const sanitizedValue = getSanitizedValue(property, value);
  const results = [];

  const search = (rootElement, property, value) => {
    if (!rootElement) {
      return null;
    }

    const styles = window.getComputedStyle(rootElement);
    if (styles[property] === value) {
      results.push(rootElement);
    }

    [...rootElement.children].forEach((child) =>
      search(child, property, value)
    );
  };

  search(root, property, sanitizedValue);

  return results;
};

const getSanitizedValue = (property, value) => {
  const div = document.createElement("div");
  div.style[property] = value;

  document.body.appendChild(div);

  const styles = window.getComputedStyle(div);
  const sanitizedValue = styles[property];

  div.remove();

  return sanitizedValue;
};
