import { Util } from "./utilites.mjs";

Util.init();

// ---------- Handling downing of data ----------
const link = document.querySelector("#downloadBtn");

// creating link
const dataURL = Util.createDownloadFile(link);

let clicked = false;

// creating event listener to make sure links get removed after download
link.addEventListener("click", () => {
  clicked = true;
});

if (clicked) {
  window.URL.revokeObjectURL(dataURL);
}

// ---------- Handling form information and uploading of data ----------
let uploadedData;

// getting file from user
const fileInput = document.querySelector("#datafile");
fileInput.addEventListener("change", async (event) => {
  uploadedData = await Util.getDataFromFile(event);
});

// adding event listener to upload button to finalize saving data
const uploadBtn = document.querySelector("#uploadData");

uploadBtn.addEventListener("click", () => {
  // saving data
  Util.setLocalStorage("savedShows", uploadedData);

  // adding success message'
  const msg = document.createElement("p");
  msg.classList.add("success");
  msg.textContent = "Your data has been successfully uploaded";

  // adding to DOM
  document.querySelector("#upload").append(msg);
});
