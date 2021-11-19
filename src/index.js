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
    });
  });
}

tabFilter();

function chooseTag(e) {
  let tags = document.querySelectorAll(".photographesTagList");
  let vignettes = document.querySelectorAll(".vignettePhotographes");

  vignettes.forEach((vignette) => {
    let includeResult = vignette.innerHTML.includes(e);

    tags.forEach(function () {
      if (includeResult === false) {
        vignette.style.display = "none";
      } else {
        vignette.style.display = "flex";
      }
    });
  });
}
