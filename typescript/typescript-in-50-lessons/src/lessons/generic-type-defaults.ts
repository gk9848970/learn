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

type Nullable<T> = T | undefined;

class Container {
  #element: Nullable<HTMLElement>;
  #prefs: UserPreferences;

  // We only require the user preferences
  // to be set at instantiation
  constructor(prefs: UserPreferences) {
    this.#prefs = prefs;
  }

  // We can set the element to an HTML element
  set element(value: Nullable<HTMLElement>) {
    this.#element = value;
  }

  get element(): Nullable<HTMLElement> {
    return this.#element;
  }

  // We load the video inside a video element.
  // If #element isn't an HTMLVideoElement, we
  // create one and append it to #element
  loadVideo(formats: VideoFormatURLs) {
    const selectedFormat = formats[this.#prefs.format].href;
    if (this.#element instanceof HTMLVideoElement) {
      this.#element.src = selectedFormat;
    } else if (this.#element) {
      const vid = document.createElement("video");
      this.#element.appendChild(vid);
      vid.src = selectedFormat;
    }
  }
}

const userPrefs: UserPreferences = {
  format: "format1080p",
  subtitles: {
    active: false,
    language: "english",
  },
  theme: "light",
};

const videos: VideoFormatURLs = {
  format360p: new URL("https://example.com/video-360p.mp4"),
  format480p: new URL("https://example.com/video-480p.mp4"),
  format720p: new URL("https://example.com/video-720p.mp4"),
  format1080p: new URL("https://example.com/video-1080p.mp4"),
};

const container = new Container(userPrefs);
container.element = document.createElement("video");
container.loadVideo(videos);

declare function createVid<GElement extends HTMLElement = HTMLVideoElement>(
  prefs: UserPreferences,
  formats: VideoFormatURLs,
  element?: GElement
): GElement;

const a = createVid(userPrefs, videos);
const b = createVid(userPrefs, videos, document.createElement("div"));
const c = createVid<HTMLAudioElement>(userPrefs, videos);
