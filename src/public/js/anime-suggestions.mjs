import { Util } from "./utilites.mjs";

export default class animeSuggestion {

    constructor() { }
    
    async init(clear = false) {
        if (clear) {
            const info = document.querySelector('#show-info');
            while (info.firstChild) {
                info.removeChild(info.firstChild);
            }
        }

        // getting shows data
        this.showsData = await Util.getData('https://api.jikan.moe/v4/anime');

        // testing
        console.log(this.showsData);

        // pick a show
        const selectedShow = this.pickShow(this.showsData);
        console.log(selectedShow);

        // display information
        this.displayShow(selectedShow);
    }

    pickShow(shows) {
        const showsLen = shows.length;
        const showId = Util.getRandomNum(showsLen);
        // testing
        const show = shows[showId];
        return show;
    }

    displayShow(show) {
        // getting elements from DOM
        const info = document.querySelector('#show-info');

        // setting info 
        const title = document.createElement('li');
        const trailer  = document.createElement('li');
        const rating = document.createElement('li');
        const score = document.createElement('li');
        const year = document.createElement('li');
        const synopsis = document.createElement('li');

        // adding info to li's
        title.textContent = `${show.title}`;
        trailer.innerHTML = `Trailer: <a href="${show.trailer.embed_url}">Click here!</a>`;
        rating.textContent = `Rating: ${show.rating}`;
        score.textContent = `Score: ${show.score} / 10`;
        year.textContent = `Aired: ${show.year}`;
        synopsis.textContent = `Synopsis: ${show.synopsis}`;

        // adding li's to parent info element
        info.append(title, trailer, rating, score, year, synopsis);
    }
}