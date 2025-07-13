// TS
class Article {
  public title: string;
  public readonly description: string;
  private price: number;

  constructor(title: string, price: number, description: string) {
    this.title = title;
    this.price = price;
    this.description = description;
  }
}

const article = new Article("Form Design Patterns", 39, "Description");
console.log(article.price);
article.title = "Something new";
article.description = "Something else";

// JS way of declaring private fields
class Item {
  public title: string;
  #price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.#price = price;
  }
}

const item = new Item("Form Design Patterns", 39);
console.log(item.price);

// Abstract classes
abstract class Base {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

const b = new Base();

// Implementation that completes abstract class
class Derived extends Base {
  getName() {
    return "world";
  }
}

const d = new Derived();
d.printName();

// Not allowed with erasableSyntaxOnly flag
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const direction = Direction.Up;

console.log(direction);
