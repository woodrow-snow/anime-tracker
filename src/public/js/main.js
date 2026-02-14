import { Util } from "./utilites.mjs";
import animeFact from "./anime-fact.mjs";
import animeSuggestion from "./anime-suggestions.mjs";

// ---------- loading header, footer, nav ----------
async function init() {
    await Util.loadHeaderNavFooter();
    Util.navigation();
    Util.getDates();
}

init();

// ---------- Displaying anime fact ----------
const facts = new animeFact();
facts.init();

// ---------- Displaying show recommendation ----------
const shows = new animeSuggestion();
shows.init();