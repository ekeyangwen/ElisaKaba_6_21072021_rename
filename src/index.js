import { photographe } from "./Photographes.js";

const url = "./src/FishEyeData.json";

fetch(url)
  .then((response) => response.json())

  .then((data) => {
    for (let photographer of data.photographers) {
      let photographeSingle = new photographe(photographer);
      // console.log(photographeSingle.tags);
      console.log(photographeSingle);
      let photographes = document.getElementById("photographes");
      photographes.innerHTML += photographeSingle.createVignette();
    }
  });

function tabFilter() {
  let hash = document.querySelectorAll(".hash");
  console.log(hash);
  hash.forEach((event) => {
    event.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(event);
      chooseTag(e.target.innerHTML);
    });
  });
}

tabFilter();

function chooseTag(e) {
  let tags = document.querySelectorAll(".photographesTagList");
  let vignettes = document.querySelectorAll(".vignettePhotographes");

  vignettes.forEach((vignette) => {
    console.log(vignette.innerHTML);
    let includeResult = vignette.innerHTML.includes(e);

    tags.forEach(function () {
      if (includeResult === false) {
        // console.log(includeResult);
        vignette.style.display = "none";
      } else {
        vignette.style.display = "flex";
      }
    });
  });
}
