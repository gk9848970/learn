const abc = {
  gaurav: "Kumar",
  toJSON() {
    return "Nothing";
  },
};

console.log(JSON.stringify(abc)); // -> "Nothing"

type ABC = (a: string) => void;
type XYZ = { a: string };

type Test1 = ABC extends Function ? "Function" : "Not function";
type Test2 = XYZ extends Object ? "Object" : "Not Object";

// Function is a object
type Test3 = ABC extends Object ? "Object" : "Not Object";

// Object is not a function
type Test4 = XYZ extends Function ? "Function" : "Not function";

type JSONifiedObject<T> = {
  [P in keyof T]: JSONifiedValue<T[P]>;
};

type UndefinedAsNull<T> = T extends undefined ? null : T;

type JSONifiedArray<T> = Array<UndefinedAsNull<JSONified<T>>>;

type JSONifiedValue<T> = T extends string | number | boolean | null
  ? T
  : // Function before Object
  T extends Function
  ? never
  : // Array before Object
  T extends Array<infer U>
  ? JSONifiedArray<U>
  : T extends Object
  ? JSONifiedObject<T>
  : never;

// Deal with toJSON property of object
type JSONified<T> = JSONifiedValue<T extends { toJSON(): infer U } ? U : T>;

type ExtractArray<T> = T extends Array<infer U> ? U : never;

type Test5 = ExtractArray<["gaurav", "kumar", undefined, null]>;
type Test6 = UndefinedAsNull<Test5>;

class Serializer<T> {
  serialize(inp: T): string {
    return JSON.stringify(inp);
  }

  deserialize(inp: string): JSONified<T> {
    return JSON.parse(inp);
  }
}

type Widget = {
  toJSON(): {
    kind: "Widget";
  };
};

declare const widget: Widget;

const widgetSerializer = new Serializer<Widget>();

const serialization1 = widgetSerializer.serialize(widget);

const obj1 = widgetSerializer.deserialize(serialization1);

// Works for widget
type Test7 = {
  [K in keyof typeof obj1]: (typeof obj1)[K];
};

type Item = {
  // Regular primitive types
  text: string;
  count: number;
  // Options get preserved
  choice: "yes" | "no" | null;
  // Functions get dropped.
  func: () => void;
  // Nested elements need to be parsed
  // as well
  nested: {
    isSaved: boolean;
    data: [1, undefined, 2];
  };
};

declare const itemComplexitem: Item;

const itemSerializer = new Serializer<Item>();

const serialization2 = itemSerializer.serialize(item);

const obj2 = itemSerializer.deserialize(serialization2);

// Works for Item
type Test8 = {
  [K in keyof typeof obj2]: (typeof obj2)[K];
};

type Test9 = JSONifiedArray<ExtractArray<[1, undefined, 2]>>;

type Test10 = JSONifiedObject<{
  isSaved: boolean;
  data: [1, undefined, 2];
}>;

type Test11 = JSONifiedArray<1 | 2 | undefined>;

type ItemComplex = {
  widget: Widget;
  // The same object referenced again
  children?: Item[];
};

declare const itemComplex: ItemComplex;

const itemComplexSerializer = new Serializer<ItemComplex>();

const serialization3 = itemComplexSerializer.serialize(itemComplex);

const obj3 = itemComplexSerializer.deserialize(serialization3);

// Works for Item
type Test12 = {
  [K in keyof typeof obj3]: (typeof obj3)[K];
};
