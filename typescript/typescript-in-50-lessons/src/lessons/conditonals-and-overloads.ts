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
type FetchReturnParam<T extends FetchParam> = T extends number
  ? Order
  : Order[];

type Callback<Res> = (param: Res) => void;
type FetchCb<T extends FetchParam> = Callback<FetchReturnParam<T>>;

// function fetchOrder<TParam extends FetchParam>(
//   param: TParam
// ): FetchReturnParam<TParam>;

// function fetchOrder<TParam extends FetchParam>(
//   param: TParam,
//   callback: Callback<FetchReturnParam<TParam>>
// ): void;

// The problem here is no matter what you do, The parameter being optional means TCallback extends undefined is always true
function fetchOrder<TParam extends FetchParam, TCallback>(
  param: TParam,
  callback?: TCallback
): TCallback extends undefined ? FetchReturnParam<TParam> : void;

const first = fetchOrder(1);
const second = fetchOrder(x);
const third = fetchOrder(y);

const fourth = fetchOrder(1, cb);
const fifth = fetchOrder(x, cb);
const sixth = fetchOrder(y, cb);

function fetchOrder2<TParam extends FetchParam, TArgs extends unknown[]>(
  param: TParam,
  ...args: TArgs
): TArgs extends [] ? FetchReturnParam<TParam> : void;

declare const x: Customer;
declare const y: Product;
declare const cb: Callback<FetchReturnParam<FetchParam>>;

const first2 = fetchOrder2(1);
const second2 = fetchOrder2(x);
const third2 = fetchOrder2(y);

const fourth2 = fetchOrder2(1, cb);
const fifth2 = fetchOrder2(x, cb);
const sixth2 = fetchOrder2(y, cb);

function fetchOrder3<TParam extends FetchParam>(
  param: TParam
): FetchReturnParam<TParam>;

function fetchOrder3<TParam extends FetchParam>(
  param: TParam,
  callback: FetchCb<TParam>
): void;

const first3 = fetchOrder3(1);
const second3 = fetchOrder3(x);
const third3 = fetchOrder3(y);

const fourth3 = fetchOrder3(1, cb);
const fifth3 = fetchOrder3(x, cb);
const sixth3 = fetchOrder3(y, cb);
