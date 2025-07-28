/*
type HD = Pick<
  VideoFormatURLs,
  'format1080p' | 'format720p'
>

// Equivalent to
type HD = {
  format1080p: URL,
  format720p: URL
}
*/

type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
};

type CustomPick<TObj extends object, TKeys extends keyof TObj> = {
  [k in TKeys]: TObj[TKeys];
};

type HD = CustomPick<VideoFormatURLs, "format1080p" | "format720p">;

/*
Custom Record<Keys, Value>
*/

type CustomRecord<TKeys extends string | number | symbol, TValue> = {
  [k in TKeys]: TValue;
};

type VideoRecord = CustomRecord<string, URL>;

/*
Custom Split 

Split<VideoFormatURLs> = 
{ format360p: URL } | 
  { format480p: URL } | 
  { format720p: URL } | 
  { format1080p: URL }
*/

const array = [1, 2, 3, 4, 5] as const;
type ArrayValues = (typeof array)[number];

// "format360p" | "format480p" | "format720p" | "format1080p"
type VideoFormats = keyof VideoFormatURLs;

// Hover to see
type VideoFormatsMapped = {
  [K in keyof VideoFormatURLs]: K;
};

// "format360p" | "format480p" | "format720p" | "format1080p"
type VideoFormatsAdvanced = VideoFormatsMapped[keyof VideoFormatURLs];

// Instead of Just mapping key, We map an object
type VideoFormatsMappedForSplit = {
  [K in keyof VideoFormatURLs]: Record<K, VideoFormatURLs[K]>;
};

type VideoFormatsSplit = VideoFormatsMappedForSplit[keyof VideoFormatURLs];

type CustomSplit<TObj extends object> = {
  [K in keyof TObj]: Record<K, TObj[K]>;
}[keyof TObj];

type VideoFormatsSpiltByUtiltity = CustomSplit<VideoFormatURLs>;
