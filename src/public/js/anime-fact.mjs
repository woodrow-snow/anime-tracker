import { Util } from "./utilites.mjs";

export default class animeFact {
    constructor() {
        this.factURL = 'https://anime-facts-rest-api-production.up.railway.app/api/v1/';
        this.selectedId = 0;
     }
    
    async init() {
        // getting data from anime facts api
        this.afShows = await Util.getData(this.factURL);

        // selecting a random show
        const selectedShow = this.getShow();

        // getting show fact
        const selectedFact = await this.getShowFact(selectedShow);

        // building fact on page
        this.displayFacts(selectedShow, selectedFact);
    }

    checkShowId(show) {
        return show.anime_id === this.selectedId;
    }

    async getShowFact(show) {
        // getting show facts
        const url = `https://anime-facts-rest-api-production.up.railway.app/api/v1/${show.anime_name}`;

        const showFacts = await Util.getData(url);
        
        const selectedFactNum = Util.getRandomNum(showFacts.length);

        return showFacts[selectedFactNum].fact;
    }

    getShow() {
        this.showCount = this.afShows.length;
        this.selectedId = Util.getRandomNum(this.showCount);
        return this.afShows.find(this.checkShowId.bind(this));
    }

    displayFacts(sShow, sFact) {
        // getting selectedFact section
        const parent = document.querySelector('#selectedFact');
        
        // creating elements for show
        // const [name, img, fact] = document.createElement('h3, img, p');
        const name = document.createElement('h3');
        const img = document.createElement('img');
        const fact = document.createElement('p');

        // setting name
        if (sShow.anime_name.includes('_')) {
            name.textContent = `This fact comes from: ${this.formatShowName(sShow.anime_name)}`;
        }
        else {
            name.textContent = `This fact comes from: ${this.formatShowName(sShow.anime_name, false)}`
        }

        // setting img
        img.src = sShow.anime_img;
        img.alt = 'Image of show that fact comes from';

        // setting fact
        fact.textContent = sFact;

        parent.append(name);
        parent.append(img);
        parent.append(fact);
    }

    formatShowName(name, split = true) {
        if (split) {
            const splitName = name.split('_');
            const joined = splitName.join(' ');
            return Util.toTitleCase(joined);
        } else {
            return Util.toTitleCase(name);
        }    
    }
}