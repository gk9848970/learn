type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
};

type SubtitleURLs = {
  english?: URL;
  german: URL;
  french: URL;
};

type Const<TObj extends object> = {
  readonly [K in keyof TObj]: TObj[K];
};

/*
Extends was a good practice, But not having extends is good in the sense,
You can create deep versions of utility easily.

Else DeepConst<TObj[K]> would have complained rightfully that TObj[K] may not be an object
*/

type DeepConst<TObj> = {
  readonly [K in keyof TObj]: DeepConst<TObj[K]>;
};

type UserPreferences = {
  format: keyof VideoFormatURLs;
  subtitles: {
    active: boolean;
    language: keyof SubtitleURLs;
  };
  theme: "dark" | "light";
};

function generateDefaults(obj: UserPreferences): DeepConst<UserPreferences> {
  return Object.freeze(obj);
}

const defaultUP = generateDefaults({
  format: "format1080p",
  subtitles: {
    active: false,
    language: "english",
  },
  theme: "light",
});

type Optional<TObj extends object> = {
  [K in keyof TObj]?: TObj[K];
};

type DeepOptional<TObj> = {
  [K in keyof TObj]?: DeepOptional<TObj[K]>;
};

type Required<TObj extends object> = {
  [K in keyof TObj]-?: TObj[K];
};

type DeepRequired<TObj> = {
  [K in keyof TObj]-?: DeepRequired<TObj[K]>;
};

type OptionalUserPreferences = Optional<UserPreferences>;
type RequireduserPreferences = Required<OptionalUserPreferences>;

const userPerference: OptionalUserPreferences = {
  format: "format720p",
};

function combinePreferences(
  defaultP: UserPreferences,
  userP: Optional<UserPreferences>
) {
  return { ...defaultP, ...userP };
}

combinePreferences(defaultUP, userPerference);
