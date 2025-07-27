import type { Event } from "./unions";

function getEventTeaser(event: Event) {
  switch (event.kind) {
    case "conference":
      return `${event.title} (Conference), ` + `priced at ${event.price} USD`;
    case "meetup":
      return `${event.title} (Meetup), ` + `hosted at ${event.location}`;
    case "webinar":
      return `${event.title} (Webinar) ` + `available online at ${event.url}`;
    default:
      // Here event is never
      event;
      throw new Error("Not sure what to do with that!");
  }
}

function neverError(
  message: string,
  token: never // The culprit
) {
  return new Error(`${message}. ${token} should not exist`);
}

function getEventTeaser2(event: Event) {
  switch (event.kind) {
    case "conference":
      return `${event.title} (Conference), ` + `priced at ${event.price} USD`;

    default:
      // Here event is meetup or webinar
      event;
      // Typechecking immediately kicks in
      neverError("Not sure what to do with that!", event);
  }
}

function getEventTeaser3(event: Event) {
  switch (event.kind) {
    case "conference":
      return `${event.title} (Conference), ` + `priced at ${event.price} USD`;
    case "meetup":
      return `${event.title} (Meetup), ` + `hosted at ${event.location}`;
    case "webinar":
      return `${event.title} (Webinar) ` + `available online at ${event.url}`;
    default:
      // Proper way to handle switch statements
      neverError("Not sure what to do with that!", event);
  }
}

function useToggleState(): [boolean, () => void] {
  let state = false;

  return [
    false,
    () => {
      state = !state;
    },
  ];
}
