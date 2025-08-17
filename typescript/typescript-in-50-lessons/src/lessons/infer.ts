let userId = 0;

function createUser(
  name: string,
  role: "admin" | "maintenance" | "shipping",
  isActive: boolean
) {
  return {
    userId: userId++,
    name,
    role,
    isActive,
    createdAt: new Date(),
  };
}

type GetReturn1<TFunc> = TFunc extends (...args: any[]) => any ? TFunc : never;
type GetReturn2<TFunc> = TFunc extends (...args: any[]) => infer R ? R : never;

// Firsttry is exactly same as typeof function (createUser)
type FirstTry = GetReturn1<typeof createUser>;

type SecondTry = GetReturn2<typeof createUser>;

type Unpack<T> = T extends Promise<infer R> ? R : never;

type ThirdTry = Unpack<Promise<number>>;

type FlattenArray<T> = T extends Array<infer R> ? R : never;

type FourthTry = FlattenArray<string[]>;

type FifthTry = Parameters<typeof createUser>;

type CustomParameters<T> = T extends (...args: infer R) => any ? R : never;

type SixthTry = CustomParameters<typeof createUser>;
