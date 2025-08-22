// Base types created so that, Using T extends I can get the actual types correctly
type ServiceDefinition = {
  [x: string]: MethodDefinition;
};

type MethodDefinition = {
  [x: string]: StringConstructor | NumberConstructor | BooleanConstructor;
};

type RequestObject<T extends ServiceDefinition> = {
  [P in keyof T]: {
    message: P;
    payload: RequestPayload<T[P]>;
  };
}[keyof T];

type RequestHandler<T extends ServiceDefinition> = (
  req: RequestObject<T>
) => boolean;

type RequestPayload<M extends MethodDefinition> = {} extends M
  ? undefined
  : {
      [P in keyof M]: TypeFromConstructor<M[P]>;
    };

type TypeFromConstructor<T> = T extends NumberConstructor
  ? number
  : T extends StringConstructor
  ? string
  : T extends BooleanConstructor
  ? boolean
  : any;

type ServiceMethod<T extends MethodDefinition> = {} extends T
  ? () => boolean
  : (payload: RequestPayload<T>) => boolean;

// The return type of create service function
type ServiceObject<T extends ServiceDefinition> = {
  [P in keyof T]: ServiceMethod<T[P]>;
};

// declare function createService<S extends ServiceDefinition>(
//   serviceDef: S,
//   handler: RequestHandler<S>
// ): ServiceObject<S>;

function createService<S extends ServiceDefinition>(
  serviceDef: S,
  handler: RequestHandler<S>
): ServiceObject<S> {
  const service: Record<string, Function> = {};

  for (const name in serviceDef) {
    service[name] = (payload: any) => handler({ message: name, payload });
  }

  return service as ServiceObject<S>;
}

const serviceDefinitionTesting = {
  open: { filename: String, shouldAppend: Boolean },
  insert: { pos: Number, text: String },
  delete: { pos: Number, len: Number },
  close: {},
};

const service = createService(serviceDefinitionTesting, (req) => {
  switch (req.message) {
    case "open":
      req.payload;
      break;
    case "insert":
      req.payload;
      break;
    case "delete":
      req.payload;
      break;
    case "close":
      req.payload;
      break;
    default:
      return false;
  }
  return true;
});

service.open({ filename: "ga", shouldAppend: true });
service.close();
