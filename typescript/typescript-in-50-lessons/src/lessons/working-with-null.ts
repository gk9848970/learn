declare type Order = "gaurav1";
declare type Products = "gaurav2";
declare type Customers = "gaurav3";

type FetchDBKind = "orders" | "products" | "customers";

declare function listOrders(orders: Order[]): void;

type FetchDBReturn<T> = T extends "orders"
  ? Order[]
  : T extends "products"
  ? Products[]
  : T extends "customers"
  ? Customers[]
  : never;

declare function fetchFromDatabase<Kin extends FetchDBKind>(
  kind: Kin
): Promise<FetchDBReturn<Kin> | null>;

declare function process<T extends Promise<any>>(
  promise: T,
  cb: (res: NonNullable<Awaited<T>>) => void
): void;

process(fetchFromDatabase("orders"), listOrders);
