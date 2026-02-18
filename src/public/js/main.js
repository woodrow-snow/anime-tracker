import { Util } from "./utilites.mjs";
import animeFact from "./anime-fact.mjs";
import animeSuggestion from "./anime-suggestions.mjs";

// ---------- loading header, footer, nav ----------
Util.init();

// ---------- Displaying anime fact ----------
const facts = new animeFact();
facts.init();

// ---------- Displaying show recommendation ----------
const shows = new animeSuggestion();
shows.init();

// ---------- getting new show recommendation when requested ----------
const newShow = document.querySelector('#new-show-btn');
newShow.addEventListener('click', () => {
    shows.init(true);
});