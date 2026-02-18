import { Util } from "./utilites.mjs";
const LSNAME = 'savedShows';

// ---------- loading header, footer, nav ----------
Util.init();

// ---------- Pushing test show to ls for testing ----------
// const testData = {
//     data: [
//         {
//             name: 'test',
//             where: 'Crunchyroll',
//             rating: '5/10',
//             watched: 'yes',
//             again: 'yes',
//             note: 'This is a note'
//         },
//         {
//             name: 'test 2',
//             where: 'Crunchyroll',
//             rating: '6/10',
//             watched: 'yes',
//             again: 'yes',
//             note: 'This is a note'           
//         }
//     ]        
// }

// ---------- loading table data from local storage ----------
const fillTable = async function () {
    // getting table
    const table = document.querySelector('table');

    // getting data from localStorage
    const addedShowsData = Util.getLocalStorage(LSNAME).data || [];

    console.log(addedShowsData);

    // getting table row template
    const template = document.createElement('template');
    const trTemplate = await Util.loadTempate('/partials/table-row.html');
    template.innerHTML = trTemplate.trim();


    addedShowsData.forEach(show => {
        // copying template
        let tr = template.content.firstElementChild.cloneNode(true);
        
        // getting children elements
        const name = tr.querySelector('.name');
        const where = tr.querySelector('.where');
        const rating = tr.querySelector('.rating');
        const watched = tr.querySelector('.watched');
        const again = tr.querySelector('.again');
        const note = tr.querySelector('.note');

        name.textContent = show.name;
        where.textContent = show.where;
        rating.textContent = show.rating;
        watched.textContent = show.watched;
        again.textContent = show.again;
        note.textContent = show.note;

        table.append(tr);
    });
}

fillTable();
