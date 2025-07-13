// Class decalaration
type Article = {
  title: string;
  price: number;
  vat: number;
  stock?: number;
  description?: string;
};

class Discount {
  isPercentage: boolean;
  amount: number;

  constructor(isPercentage: boolean, amount: number) {
    this.isPercentage = isPercentage;
    this.amount = amount;
  }

  apply(article: Article) {
    if (this.isPercentage) {
      article.price = article.price - article.price * this.amount;
    } else {
      article.price = article.price - this.amount;
    }
  }
}

// A discount that shaves off 10 EUR
const discount = new Discount(false, 10);
const article = {
  price: 39,
  vat: 0.2,
  title: "Form Design Patterns",
};

console.log(article.price, "Discount1");

discount.apply(article);

console.log(article.price, "Discount1");

// Class declaration used as type
export type ApplyFromDiscount = Discount["apply"];

export const discount2: Discount = {
  isPercentage: false,
  amount: 40,
  apply(article) {
    article.price = 20;
  },
};

const article2 = {
  price: 39,
  vat: 0.2,
  title: "Form Design Patterns",
};

console.log(article2.price, "Discount2");

discount2.apply(article2);

console.log(article2.price, "Discount2");

type DiscountType = {
  isPercentage: boolean;
  amount: number;
  apply: (article: Article) => void;
};

export const discount3: DiscountType = new Discount(false, 30);

// Extention of classes
class TwentyPercentDiscount extends Discount {
  // No special constructor
  constructor() {
    // But we call the super constructor of
    // Discount
    super(true, 0.2);
  }

  apply(article: Article) {
    if (article.price <= 40) {
      super.apply(article);
    }
  }
}

// Interchangeable as Shapes are same
export const discount4: Discount = new TwentyPercentDiscount();
export const discount5: TwentyPercentDiscount = new Discount(true, 0.3);

// Extending with shape change
class TwentyPercentDiscountWithValidation extends Discount {
  constructor() {
    super(true, 0.2);
  }

  apply(article: Article) {
    if (this.isValidForDiscount(article)) {
      super.apply(article);
    }
  }

  isValidForDiscount(article: Article) {
    return article.price <= 40;
  }
}

// Same thing as with normal object typing happens
export const discount6: Discount = new TwentyPercentDiscountWithValidation();
export const discount7: TwentyPercentDiscountWithValidation = new Discount(
  true,
  0.3
);
