import { photographe } from "./Photographes.js";

const url = "./src/FishEyeData.json";

fetch(url)
  .then((response) => response.json())

  .then((data) => {
    for (let photographer of data.photographers) {
      let photographeSingle = new photographe(photographer);
      let photographes = document.getElementById("photographes");
      photographes.innerHTML += photographeSingle.createVignette();
    }
  });

function tabFilter() {
  let hash = document.querySelectorAll(".hash");
  hash.forEach((event) => {
    event.addEventListener("click", function (e) {
      e.preventDefault();
      chooseTag(e.target.innerHTML);
      console.log(e.target.innerHTML);
    });
  });

  hash.forEach((event) => {
    event.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        e.preventDefault();
        chooseTag(e.target.innerHTML);
        console.log(e.target.innerHTML);
      }
    });
  });
}

tabFilter();

function chooseTag(e) {
  let tagsTab = document.querySelectorAll(".tagsTab");
  let vignettes = document.querySelectorAll(".vignettePhotographes");

  vignettes.forEach((vignette) => {
    let includeResult = vignette.innerHTML.includes(e);
    console.log(vignette.innerHTML);
    console.log(includeResult);

    tagsTab.forEach(function () {
      if (includeResult === false) {
        vignette.style.display = "none";
      } else {
        vignette.style.display = "flex";
      }
    });
  });
}
