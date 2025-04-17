/*
const json = { 
  type: 'div', 
  props: { id: 'hello', class: "foo" }, 
  children: [
    {type:'h1', children: 'HELLO' },
    {type:'p', children: [{type:'span', props: {class: "bar" }, children: 'World' }] }
  ]
};

const json = [
{ 
  type: 'div', 
  props: { id: 'hello', class: "foo" }, 
  children: [
    {type:'h1', children: 'HELLO' },
    {type:'p', children: [{type:'span', props: {class: "bar" }, children: 'World' }] }
  ]
},
{ 
  type: 'section', 
  props: { id: 'hello-2', class: "foo-2" }, 
  children: [
    {type:'h1', children: 'HELLO-2' },
    {type:'p', children: [{type:'span', props: {class: "bar-2" }, children: 'World' }] }
  ]
}];
*/

export const convertJSONToHtml = (json) => {
  const fragment = document.createDocumentFragment();

  if (Array.isArray(json)) {
    fragment.replaceChildren(...json.map((child) => convertJSONToHtml(child)));
  } else {
    const element = document.createElement(json.type);
    if (json.props) {
      Object.entries(json.props).forEach(([key, value]) =>
        element.setAttribute(key, value)
      );
    }

    if (Array.isArray(json.children)) {
      element.replaceChildren(
        ...json.children.map((child) => convertJSONToHtml(child))
      );
    } else {
      element.innerHTML = json.children;
    }

    fragment.replaceChildren(element);
  }

  return fragment;
};
