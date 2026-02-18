import { Util } from "./utilites.mjs";

// global vars
const LSNAME = "savedShows";
const data = new URLSearchParams(window.location.search);

Util.init();

// getting data from ls
const currentShows = Util.getLocalStorage(LSNAME) || {};

// ensuring data exists if currentShows is empty, if it is then create the data array within it
if (Object.keys(currentShows).length === 0) {
  currentShows.data = [];
}

const thankYou = document.querySelector("#thankYou");

// ---------- adding information to localStorage ----------
if (data.get("from") == "add") {
  // getting id
  let currentShowsLen = currentShows.data.length;

  // checking to see if length is undefined, if it is, setting to 0
  if (currentShowsLen === undefined) {
    currentShowsLen = 0;
  }

  let newShow = {
    id: currentShowsLen,
    name: data.get("name"),
    where: data.get("where"),
    rating: data.get("rating"),
    watched: data.get("watched"),
    again: data.get("again"),
    note: data.get("notes"),
  };
  currentShows.data.push(newShow);

  // displaying confirmation
  thankYou.innerHTML = `
    <h2>Your show "${data.get("name")}" has been added</h2>
    <p>Click below to return to the shows page</p>
`;
} else if (data.get("from") == "update") {
  // getting current show
  let showUpdated;
  for (let i = 0; i < currentShows.data.length; i++) {
    if (data.get("id") == currentShows.data[i].id) {
      showUpdated = currentShows.data[i];
      break;
    }
  }

  // assigning new values
  showUpdated.name = data.get("name");
  showUpdated.where = data.get("where");
  showUpdated.rating = data.get("rating");
  showUpdated.watched = data.get("watched");
  showUpdated.again = data.get("again");
  showUpdated.note = data.get("notes");

  // setting in current shows

  thankYou.innerHTML = `
    <h2>Your show "${data.get("name")}" has been Updated</h2>
    <p>Click below to return to the shows page</p>
    `;
}

Util.setLocalStorage(LSNAME, currentShows);
