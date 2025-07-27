type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
};

declare const videos: VideoFormatURLs;

type URLList = {
  [k: string]: URL;
};

function loadFile<Formats extends URLList>(
  fileFormats: Formats,
  format: keyof Formats
) {}

loadFile(videos, "format1080p");
// Error
loadFile(videos, "anything");

async function loadFilePromise<Formats extends URLList>(
  fileFormats: Formats,
  format: keyof Formats
) {
  // Fetch the data
  const data = await fetch(fileFormats[format].href);
  return {
    format,
    loaded: data.status === 200,
  };
}

async function main() {
  /*
    Gives {
        format: keyof VideoFormatURLs;
        loaded: boolean;
    }
*/
  const result = await loadFilePromise(videos, "format1080p");
}

async function loadFilePromise2<
  Formats extends URLList,
  Key extends keyof Formats
>(fileFormats: Formats, format: Key) {
  // Fetch the data
  const data = await fetch(fileFormats[format].href);
  return {
    format,
    loaded: data.status === 200,
  };
}

async function main2() {
  /*
    {
        format: "format1080p";
        loaded: boolean;
    }
*/
  const result = await loadFilePromise2(videos, "format1080p");
}
