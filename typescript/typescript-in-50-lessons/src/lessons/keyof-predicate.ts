import type { Event } from "./unions";

type UserEvents = {
  watching: Event[];
  rvsp: Event[];
  attended: Event[];
  signedout: Event[];
};

// Used keyof
function filterUserEvent(
  userEventList: UserEvents,
  category: keyof UserEvents,
  filterKind?: Event["kind"]
) {
  const filteredList = userEventList[category];
  if (filterKind) {
    return filteredList.filter((event) => event.kind === filterKind);
  }
  return filteredList;
}

function isUserEventListCategory(
  list: UserEvents,
  category: string
): category is keyof UserEvents {
  return Object.keys(list).includes(category);
}

function filterUserEvent2(
  userEventList: UserEvents,
  category: string,
  filterKind?: Event["kind"]
) {
  // Used type predicate
  if (isUserEventListCategory(userEventList, category)) {
    const filteredList = userEventList[category];
    if (filterKind) {
      return filteredList.filter((event) => event.kind === filterKind);
    }
    return filteredList;
  }
}
