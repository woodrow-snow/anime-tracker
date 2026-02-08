const Util = {};

Util.navigation = function () { // might need to be async. Unsure at this time
    console.log('nav function started');

    const navButton = document.querySelector('#ham-btn');
    const navLinks = document.querySelector('#nav-bar');

    console.log('Nav button: ' + navButton);
    console.log('nav links: ' + navLinks);

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

export { Util };