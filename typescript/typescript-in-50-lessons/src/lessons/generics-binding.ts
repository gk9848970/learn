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

type UserPreferences = {
  format: keyof VideoFormatURLs;
  subtitles: {
    active: boolean;
    language: keyof SubtitleURLs;
  };
  theme: "dark" | "light";
};

const defaultUP = {
  format: "format1080p",
  subtitles: {
    active: false,
    language: "english",
  },
  theme: "light",
} as const;

function combinePreferences(
  defaultP: UserPreferences,
  userP: Partial<UserPreferences>
) {
  return { ...defaultP, ...userP };
}

const perfs = combinePreferences(defaultUP, {
  format: "format720p",
  theme: "dark",
});

// Types are vague
perfs.theme;
perfs.format;

const variable = {
  format: "format720p",
  theme: "dark",
};

// Erroring, TS isn't sure that value is not gonna change
const perfsWithVariable = combinePreferences(defaultUP, variable);

const variable2 = {
  format: "format720p",
  theme: "dark",
} as const;

const perfsWithVariable2 = combinePreferences(defaultUP, variable2);

const variable3: Partial<UserPreferences> = {
  format: "format720p",
  theme: "dark",
};

const perfsWithVariable3 = combinePreferences(defaultUP, variable3);

// Generic binding
function combinePreferencesViaBinding<
  UserPref extends Partial<UserPreferences>
>(defaultP: UserPreferences, userP: UserPref) {
  return { ...defaultP, ...userP };
}

// Type has changed now
const perfsWithBinding = combinePreferencesViaBinding(defaultUP, {
  format: "format720p",
  theme: "dark",
});

// Types are exact
perfsWithBinding.theme;
perfsWithBinding.format;

// Fails typecheck again
const perfsWithVariableBinding = combinePreferencesViaBinding(
  defaultUP,
  variable
);

// Type has changed now
const perfsWithVariableBinding2 = combinePreferencesViaBinding(
  defaultUP,
  variable2
);

// Type has changed now
const perfsWithVariableBinding3 = combinePreferencesViaBinding(
  defaultUP,
  variable3
);

function combinePreferencesViaAdvanceBinding<
  Defaults extends UserPreferences,
  UserPref extends Partial<UserPreferences>
>(defaultP: Defaults, userP: UserPref) {
  return { ...defaultP, ...userP };
}

const perfsWithAdvanceBinding = combinePreferencesViaBinding(defaultUP, {
  format: "format720p",
  theme: "dark",
});

// Types are exact
perfsWithBinding.theme;
perfsWithBinding.format;
