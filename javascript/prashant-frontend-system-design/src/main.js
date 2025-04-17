import { convertJSONToHtml } from "./javascript-based-problems/convert-json-to-html";

const json = {
  type: "div",
  props: { id: "hello", class: "foo" },
  children: [
    { type: "h1", children: "HELLO" },
    {
      type: "p",
      children: [{ type: "span", props: { class: "bar" }, children: "World" }],
    },
  ],
};

const json2 = [
  {
    type: "div",
    props: { id: "hello", class: "foo" },
    children: [
      { type: "h1", children: "HELLO" },
      {
        type: "p",
        children: [
          { type: "span", props: { class: "bar" }, children: "World" },
        ],
      },
    ],
  },
  {
    type: "section",
    props: { id: "hello-2", class: "foo-2" },
    children: [
      { type: "h1", children: "HELLO-2" },
      {
        type: "p",
        children: [
          { type: "span", props: { class: "bar-2" }, children: "World" },
        ],
      },
    ],
  },
];

console.log(convertJSONToHtml(json2));
