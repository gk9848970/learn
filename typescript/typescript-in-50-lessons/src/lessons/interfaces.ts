// Our Article type
type Article = {
  title: string;
  price: number;
};

// Our friend's ShopItem
interface ShopItem {
  title: string;
  price: number;
}

class DVD implements ShopItem {
  title: string;
  price: number;

  constructor(title: string) {
    this.title = title;
    this.price = 9.99;
  }
}

class Book implements Article {
  title: string;
  price: number;

  constructor(title: string) {
    this.title = title;
    this.price = 9.99;
  }
}

// Both types can be used interchangebly
export const book: DVD = new Book("Harry potter");
export const dvd: Book = new DVD("Harry potter");

// Declaration merging: This will make shopItem have one more property and hence break the above typing
// interface ShopItem {
//   review: string[];
// }

// Declaration merging across files
declare global {
  interface Window {
    isDevelopment: boolean;
  }
}

console.log(window.isDevelopment);
