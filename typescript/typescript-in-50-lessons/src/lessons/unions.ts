// Improved EventKind with better semantic meaning
export type EventKind = "conference" | "meetup" | "webinar";

// Enhanced Talk type with better constraints
type Talk = {
  title: string;
  abstract: string;
  speaker: string;
};

// Base event details with better validation
type EventDetails = {
  title: string;
  description: string;
  date: Date;
  capacity: number;
  rsvp: number;
};

// Conference with improved typing
type Conference = EventDetails & {
  kind: "conference";
  location: string;
  price: number;
  talks: Talk[];
};

// Meetup with improved typing
type Meetup = EventDetails & {
  kind: "meetup";
  location: string;
  price: string;
  talks: Talk[];
};

// Webinar with improved typing
type Webinar = EventDetails & {
  kind: "webinar";
  url: string;
  price?: number;
  talks: Talk;
};

// Hackathon with improved typing
export type Hackathon = EventDetails & {
  kind: "hackathon";
  mission: string;
};

// Union type
export type Event = Conference | Webinar | Meetup;

// Type guards for better runtime safety
export function isConference(event: Event): event is Conference {
  return event.kind === "conference";
}

export function isMeetup(event: Event): event is Meetup {
  return event.kind === "meetup";
}

export function isWebinar(event: Event): event is Webinar {
  return event.kind === "webinar";
}

// Utility types for better type manipulation
type EventByKind<T extends EventKind> = Extract<Event, { kind: T }>;

type ConferenceEvent = EventByKind<"conference">;
type MeetupEvent = EventByKind<"meetup">;
type WebinarEvent = EventByKind<"webinar">;

// Cannot access location directly
type ABC1 = Event["location"];

// Cann access price and talks directly
type ABC2 = Event["price"];
type ABC3 = Event["talks"];

function logEvent(event: Event) {}

const script19 = {
  title: "ScriptConf",
  date: new Date("2019-10-25"),
  capacity: 300,
  rsvp: 289,
  description: "The feel-good JS conference",
  kind: "conference",
  price: 129,
  location: "Central Linz",
  talks: [
    {
      speaker: "Vitaly Friedman",
      title: "Designing with Privacy in Mind",
      abstract: "...",
    },
  ],
};

// Not compatible as kind is infered as string
logEvent(script19);

const script192 = {
  title: "ScriptConf",
  date: new Date("2019-10-25"),
  capacity: 300,
  rsvp: 289,
  description: "The feel-good JS conference",
  kind: "conference",
  price: 129,
  location: "Central Linz",
  talks: [
    {
      speaker: "Vitaly Friedman",
      title: "Designing with Privacy in Mind",
      abstract: "...",
    },
  ],
} as const;

// Also not compatible due to mutable and readonly issue
logEvent(script192);

const script193 = {
  title: "ScriptConf",
  date: new Date("2019-10-25"),
  capacity: 300,
  rsvp: 289,
  description: "The feel-good JS conference",
  kind: "conference" as "conference",
  price: 129,
  location: "Central Linz",
  talks: [
    {
      speaker: "Vitaly Friedman",
      title: "Designing with Privacy in Mind",
      abstract: "...",
    },
  ],
};

// Price is number as script193 is interpreted as Event of conference type
script193.price;

// Compatible as well
logEvent(script193);

const script194 = {
  title: "ScriptConf",
  date: new Date("2019-10-25"),
  capacity: 300,
  rsvp: 289,
  description: "The feel-good JS conference",
  kind: "conference" as "meetup",
  price: 129,
  location: "Central Linz",
  talks: [
    {
      speaker: "Vitaly Friedman",
      title: "Designing with Privacy in Mind",
      abstract: "...",
    },
  ],
};

// Script is treated as meetup and hence incompatible as script194 doesn't conform to a valid meetup type
logEvent(script194);

const script195: Event = {
  title: "ScriptConf",
  date: new Date("2019-10-25"),
  capacity: 300,
  rsvp: 289,
  description: "The feel-good JS conference",
  kind: "conference",
  price: 129,
  location: "Central Linz",
  talks: [
    {
      speaker: "Vitaly Friedman",
      title: "Designing with Privacy in Mind",
      abstract: "...",
    },
  ],
};

// script195 is correctly understood as "conference"
logEvent(script195);

const script196 = {
  title: "ScriptConf",
  date: new Date("2019-10-25"),
  capacity: 300,
  rsvp: 289,
  description: "The feel-good JS conference",
  kind: "conference" as const,
  price: 129,
  location: "Central Linz",
  talks: [
    {
      speaker: "Vitaly Friedman",
      title: "Designing with Privacy in Mind",
      abstract: "...",
    },
  ],
};

// script196 is correctly understood as "conference"
script196.price;
logEvent(script196);
