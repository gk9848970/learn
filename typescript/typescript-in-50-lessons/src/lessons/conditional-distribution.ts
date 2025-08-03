type Customer = {
  customerId: number;
  firstName: string;
  lastName: string;
};

type Product = {
  productId: number;
  title: string;
  price: number;
};

type Order = {
  orderId: number;
  customer: Customer;
  products: Product[];
  date: Date;
};

type FetchParam = number | Customer | Product;
type FetchReturnParamComplex<T extends FetchParam> = T extends Customer
  ? Order[]
  : T extends Product
  ? Order[]
  : Order;

type ABC = FetchReturnParamComplex<Customer | number | Product>;

type FetchReturnParamNonNaked<T extends FetchParam> = [T] extends [Customer]
  ? Order[]
  : [T] extends [Product]
  ? Order[]
  : [T] extends [number]
  ? Order
  : never;

type DEF = FetchReturnParamNonNaked<Customer>;
type GHI = FetchReturnParamNonNaked<number>;
type JKL = FetchReturnParamNonNaked<Product>;

// This is never
type MNO = FetchReturnParamNonNaked<Customer | number | Product>;
