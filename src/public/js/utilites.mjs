const Util = {};

Util.navigation = function () { // might need to be async. Unsure at this time

    const navButton = document.querySelector('#ham-btn');
    const navLinks = document.querySelector('#nav-bar');

    // toggling show class
    navButton.addEventListener("click", () => {
        console.log('click registered');
        navButton.classList.toggle('show');
        navLinks.classList.toggle('show'); 
    });
}

Util.loadHeaderNavFooter = async function () {
    // loading header footer and nav templates
    const headerTemplate = await this.loadTempate('/partials/header.html');
    const navTemplate = await this.loadTempate('/partials/nav.html');
    const footerTemplate = await this.loadTempate('/partials/footer.html');

    // getting header nav and footer
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');

    // loading with render temlate
    this.renderWithTemplate(headerTemplate,header);
    this.renderWithTemplate(navTemplate, nav);
    this.renderWithTemplate(footerTemplate, footer);
}

Util.loadTempate = async function (url) {
    const res = await fetch(url);
    const template = await res.text();
    return template;
}

Util.renderWithTemplate = function (tempalate, parentElement, data, callback) {
    parentElement.innerHTML = tempalate;

    if (callback) {
        callback(data);
    }
}

Util.getDates = function () { 
    const currentYear = document.getElementById("currentyear");
    const lastModifiedDoc = document.getElementById("lastModified");

    // get the current year and display
    const today = new Date();
    let year = today.getFullYear();
    
    currentYear.textContent = year;
    
    // getting last modified date and displaying
    lastModifiedDoc.textContent = `Last Modified: ${document.lastModified}`;
}

Util.getData = async function (url) {
    try {
        const response = await fetch(url);
        const data = await convertToJson(response);
        return data.data;
    } catch (error) {
        console.error('Error in getData: ', error);
    }
}

Util.toTitleCase = function (str) {
    const returnStr = str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    // testing
    console.log('returnStr: ', returnStr);
    return returnStr;
}

function convertToJson(res) {
    let resJson = res.json();

    if (res.ok) {
        return resJson;
    } else {
        throw { name: 'convert to json error', message: resJson };
    }
}

Util.getRandomNum = function (max, min = 1) {
    max += 1;
    let num = Math.floor(Math.random() * max) + min;
    return num;
}

Util.getLocalStorage = function (varName) {
    return JSON.parse(localStorage.getItem(varName));
}

Util.setLocalStorage = function (varName, saveData) {
    localStorage.setItem(varName, JSON.stringify(saveData));
}

Util.init = async function () {
    // loading header, footer, and nav
    await this.loadHeaderNavFooter();
    Util.navigation();
    Util.getDates();

    // ---------- updating where nav is at currently ----------
    // getting dataset nav from DOM
    const navArea = document.querySelector('#navArea');
    const page = navArea.dataset.nav;

    alterCurrentClass(page);

    // adding favicon to head
    const head = document.querySelector('head');
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = '/images/anime-favicon.ico';

    head.append(favicon);
}

function alterCurrentClass(addToNav) {
        // getting nav options from DOM
        const home = document.querySelector('#homeNav');
        const shows = document.querySelector('#showsNav');
        const data = document.querySelector('#dataNav');

        if (addToNav === 'home') {
            // adding current class to home nav option
            home.classList.add('current');

            // remove current from other nav options
            shows.classList.remove('current');
            data.classList.remove('current');
        }
        else if(addToNav === 'shows'){
            // adding current class to  nav option
            shows.classList.add('current');
        
            // remove current from other nav options
            home.classList.remove('current');
            data.classList.remove('current');
        }
        else if (addToNav === 'data') {
            // adding current class to  nav option
            data.classList.add('current');
        
            // remove current from other nav options
            shows.classList.remove('current');
            home.classList.remove('current');
        }
}

Util.createShowDropdown = function (lsname) {
    // getting data from ls
    const data = this.getLocalStorage(lsname).data;

    let showSelect = '<option value="">Choose a Show</option>';
    data.forEach(s => {
        showSelect += `<option value="${s.id}">${s.name}</option>`;
    });

    return showSelect;
}

Util.createDownloadFile = function (btn) {
    // getting data from localStorage
    const data = this.getLocalStorage('savedShows');

    // creating blob
    const showsBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const showsURL = window.URL.createObjectURL(showsBlob);

    btn.href = showsURL;
    btn.download = 'showsData.json';

    return showsURL;
}

Util.getDataFromFile = function (event) {
    return new Promise((resolve, reject) => {
        // getting file
        const file = event.target.files[0];

        // getting info off file
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const showsString = e.target.result;
                
                // parseing json string
                try {
                    const showsData = JSON.parse(showsString);
                    resolve(showsData);
                }
                catch (error) {
                    console.error('Error parsing data:', error);
                    reject(error);
                }
            }

            reader.onerror = function (e) {
                console.error('Error reading file:', e.target.error);
            }

            reader.readAsText(file);
        } else {
            console.log('No file selected');
        }
    });
}

export { Util };