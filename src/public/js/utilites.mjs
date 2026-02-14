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

Util.toTitleCase = function (str){
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
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
    return Math.floor(Math.random() * max) + min;
}

export { Util };