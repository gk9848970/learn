type Medium = {
  id: number;
  title: string;
  artist: string;
};

type TrackInfo = {
  duration: number;
  tracks: number;
};

type CD = Medium &
  TrackInfo & {
    kind: "cd";
  };

type LP = Medium & {
  sides: {
    a: TrackInfo;
    b: TrackInfo;
  };
  kind: "lp";
};

type AllMedia = CD | LP;
type MediaKinds = AllMedia["kind"];
type AllMediaInfoToPass<TMedia extends AllMedia> = Omit<TMedia, "id" | "kind">;
type SelectBranchSimple<TKind extends MediaKinds> = TKind extends "cd"
  ? CD
  : LP;

function createMedium<TKind extends MediaKinds>(
  kind: TKind,
  info: AllMediaInfoToPass<SelectBranchSimple<TKind>>
): AllMedia;
/*
// Check type of autocomplete
createMedium("cd", {
    ""
});

createMedium("lp", {
    ""
});
*/

type SelectBranch<Brnch, Kin> = Brnch extends { kind: Kin } ? Brnch : never;

// CD | LP extends { kind: "cd" } -> CD | never
type ABC = SelectBranch<AllMedia, "cd">;

function createMediumTwo<TKind extends MediaKinds>(
  kind: TKind,
  info: AllMediaInfoToPass<SelectBranch<AllMedia, TKind>>
): SelectBranch<AllMedia, TKind>;

createMediumTwo("cd");

// SelectBranch can also be written with help of Extact<A, B> defined as
// Extract<A, B> = A extends B ? A : never (Can B be extended to A)

function createMediumThree<TKind extends MediaKinds>(
  kind: TKind,
  info: AllMediaInfoToPass<Extract<AllMedia, { kind: TKind }>>
): Extract<AllMedia, { kind: TKind }>;
