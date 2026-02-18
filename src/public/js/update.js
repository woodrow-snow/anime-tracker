import { Util } from "./utilites.mjs";

Util.init();

const LSNAME = "savedShows";

// ---------- Creating show select dropdown and adding to DOM ----------
const showDropDown = Util.createShowDropdown(LSNAME);

// getting section select will go in
const showSelect = document.querySelector("#showSelect");
showSelect.innerHTML = showDropDown;

// ---------- Event Listener for dropdown ----------
showSelect.addEventListener("change", () => {
  // ensuring old form is delete
  const oldForm = document.querySelector("#editShowForm");
  if (oldForm !== null) {
    oldForm.remove();
  }

  const show_id = showSelect.value;

  let selectedShow;
  const showsData = Util.getLocalStorage(LSNAME).data;

  // selecting show from show data
  for (let i = 0; i < showsData.length; i++) {
    if (showsData[i].id == show_id) {
      selectedShow = showsData[i];
      break;
    }
  }

  // building form
  buildShowForm(selectedShow);
});

function buildShowForm(show) {
  // getting section from DOM for form to go in
  const formParent = document.querySelector("#updateSection");
  const radioOptions = ["Yes", "No"];

  // creating form
  const form = document.createElement("form");
  form.id = "editShowForm";
  form.method = "GET";
  form.action = "/shows/confirm.html";

  // creating form innerHTML
  // name
  let formHTML = '<label for="name">Name:';
  formHTML += `<input type="text" name="name" id="name" required value="${show.name}">`;
  formHTML += "</label>";

  // where
  formHTML += '<label for="where">Where can you watch this show?:';
  formHTML += `<input type="text" name="where" id="where" value="${show.where}">`;
  formHTML += "</label>";

  // rating
  formHTML += '<label for="rating">Personal Rating:';
  formHTML += `<input type="text" name="rating" id="rating" pattern="^(10(\.0)?|[0-9](\.[0-9])?)/10$" placeholder="x/10" value="${show.rating}">`;
  formHTML += "</label>";

  // watched
  formHTML += "<fieldset>";
  formHTML += "<legend>Have you watched this show?</legend>";
  radioOptions.forEach((r) => {
    formHTML += `<label for="${r}">${r}`;
    formHTML += `<input type="radio" name="watched" id="${r}" value="${r}" required`;
    if (show.watched == r) {
      formHTML += " checked";
    }
    formHTML += ">";
    formHTML += "</label>";
  });
  formHTML += "</fieldset>";

  // again
  formHTML += "<fieldset>";
  formHTML += "<legend>Would you watch this show again?</legend>";
  radioOptions.forEach((r) => {
    formHTML += `<label for="${r.toLowerCase()}">${r}`;
    formHTML += `<input type="radio" name="again" id="${r.toLowerCase()}" value="${r}" required`;
    if (show.watched == r) {
      formHTML += " checked";
    }
    formHTML += ">";
    formHTML += "</label>";
  });
  formHTML += "</fieldset>";

  // notes
  formHTML += '<label for="notes">Notes:';
  formHTML += `<textarea name="notes">${show.note}</textarea>`;
  formHTML += "</label>";

  // submit and hidden
  formHTML +=
    '<input type="submit" value="Update your Show" class="buttonStyle">';
  formHTML += '<input type="hidden" value="update" name="from">';
  formHTML += `<input type="hidden" name="id" value="${show.id}">`;

  form.innerHTML = formHTML;
  formParent.append(form);
}
