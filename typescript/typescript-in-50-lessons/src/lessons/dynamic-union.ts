import { type Event, type Hackathon, type EventKind } from "./unions";

type NewEvent = Event | Hackathon;
function filterByKind(list: NewEvent[], kind: EventKind): NewEvent[] {
  return list.filter((el) => el.kind === kind);
}

// Not compatible as EventKind is fixed
filterByKind([], "hackathon");

function filterByKind2(list: NewEvent[], kind: NewEvent["kind"]): NewEvent[] {
  return list.filter((el) => el.kind === kind);
}

// Kind of event is dynamic, This is called lookup type
filterByKind2([], "hackathon");

// This again has to be maintained seperately
type GroupedEvents = {
  conference: NewEvent[];
  meetup: NewEvent[];
  webinar: NewEvent[];
  hackathon: NewEvent[];
};

// Instead you can define a mapped type for this
type MappedGroupEvents = {
  [key in NewEvent["kind"]]: NewEvent[];
};

function groupEvents(events: NewEvent[]) {
  const grouped: MappedGroupEvents = {
    conference: [],
    meetup: [],
    webinar: [],
    hackathon: [],
  };
  events.forEach((el) => {
    grouped[el.kind].push(el);
  });
  return grouped;
}
