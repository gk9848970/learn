type Customer = {
  customerId: number;
  firstName: string;
  lastName: string;
};

const customer: Customer = {
  customerId: 1,
  firstName: "Stefan",
  lastName: "Baumgartner",
};

type Product = {
  productId: number;
  title: string;
  price: number;
};

const product: Product = {
  productId: 22,
  title: "Form Design Patterns",
  price: 29,
};

type Order = {
  orderId: number;
  customer: Customer;
  products: Product[];
  date: Date;
};

// function fetchOrder(customer: Customer): Order[];
// function fetchOrder(product: Product): Order[];
// function fetchOrder(orderId: number): Order;

type FetchParam = number | Customer | Product;
type FetchReturnParam<T extends FetchParam> = T extends number
  ? Order
  : Order[];

// Nested tertiary statements
type FetchReturnParamComplex<T extends FetchParam> = T extends Customer
  ? Order[]
  : T extends Product
  ? Order[]
  : Order;

declare function fetchOrder<Param extends FetchParam>(
  param: Param
): FetchReturnParam<Param>;

declare const x: any;

const first = fetchOrder(customer);
const second = fetchOrder(product);
const third = fetchOrder(1);
const fourth = fetchOrder(x);

function takeString(a: string) {}
