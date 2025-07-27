type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
};

declare const videos: VideoFormatURLs;

function isFormatVailable(
  obj: VideoFormatURLs,
  key: string
): key is keyof VideoFormatURLs {
  return key in obj;
}

type SubtitleURLs = {
  english: URL;
  german: URL;
  french: URL;
};

declare const subtitles: SubtitleURLs;

function isSubtitleVailable(
  obj: SubtitleURLs,
  key: string
): key is keyof SubtitleURLs {
  return key in obj;
}

function loadFormat(format: string) {
  if (isFormatVailable(videos, format)) {
    videos[format];
  }
}

function loadSubtitle(subtitle: string) {
  if (isSubtitleVailable(subtitles, subtitle)) {
    subtitles[subtitle];
  }
}

type URLList = {
  [k: string]: URL;
};

function isAvailable<Formats extends URLList>(
  obj: Formats,
  key: string | number | symbol
): key is keyof Formats {
  return key in obj;
}

function loadFormat2(format: string) {
  if (isAvailable(videos, format)) {
    videos[format];
  }
}

function loadSubtitle(subtitle: string) {
  if (isAvailable(subtitles, subtitle)) {
    subtitles[subtitle];
  }
}
