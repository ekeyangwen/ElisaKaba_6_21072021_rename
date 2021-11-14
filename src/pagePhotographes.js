import { MediaFactory } from "./MediaFactory.js";
import { photographe } from "./Photographes.js";

const url = "./src/FishEyeData.json";
let infoPerso;
let mediaFind;
let searchParams;
const getData = async () =>
  await fetch(url).then((response) => response.json());

const newFilter = (data) => {
  let paramsString = window.location.search;
  searchParams = new URLSearchParams(paramsString);
  searchParams.getAll("=");
  searchParams.forEach((params) => {
    // console.log(data);
    infoPerso = data.photographers.filter((info) => info.id == params);
    mediaFind = data.media.filter(
      (element) => element.photographerId == params
    );

    // console.log(mediaFind);
  });
  return { infoPerso, mediaFind };
};

const infosAndMedia = () => {
  // console.log(mediaFind);

  // let paramsString = window.location.search;
  // let searchParams = new URLSearchParams(paramsString);
  // searchParams.getAll("=");
  // searchParams.forEach((params) => {
  //   console.log(data);
  //   const infoPerso = data.photographers.filter((info) => info.id == params);
  //   const mediaFind = data.media.filter(
  //     (element) => element.photographerId == params
  //   );

  function displayMedia(mediaFind) {
    // console.log(mediaFind);
    let main = document.getElementById("pageMedia");
    // console.log(main);
    mediaFind.forEach((media) => {
      let singleMediaFind = new MediaFactory(media);
      // console.log(singleMediaFind);

      main.innerHTML += singleMediaFind.createHTML();
      // console.log(main.innerHTML);
    });
  }
  displayMedia(mediaFind);

  function displayPhotographers(infoPerso) {
    let persoPhotographes = document.getElementById("pagePerso");
    infoPerso.forEach((info) => {
      let persoSingle = new photographe(info);
      persoPhotographes.innerHTML += persoSingle.createPagePhotographes();
    });
  }
  displayPhotographers(infoPerso);

  // function tabTri(data) {
  let choix = document.getElementById("choixTri");
  choix.addEventListener("change", function (e) {
    // console.log("dans l'event de mon change");
    chooseTri(e.target.value, mediaFind);
  });

  // }
  // tabTri();

  function chooseTri(option, mediaatrier) {
    let pages = document.getElementById("pageMedia");

    // console.log("hello");

    const mediaTries = mediaatrier.sort((a, b) => {
      // console.log(mediaTries);
      if (option == "date") {
        pages.innerHTML = "";
        return (mediaatrier = new Date(b.date) - new Date(a.date));
      } else if (option == "popularite") {
        pages.innerHTML = "";
        return b.likes - a.likes;
      } else if (option == "titre") {
        if (a.title < b.title) {
          pages.innerHTML = "";
          return -1;
        }
        if (a.title > b.title) {
          pages.innerHTML = "";
          return 1;
        }
      }
    });

    displayMedia(mediaTries);

    // console.log(mediaatrier);
  }

  //   mediasTrie.forEach((trie) => {
  //
  //   });

  let tagsTab = document.querySelectorAll(".tagsTab");
  tagsTab.forEach((tag) => {
    tag.addEventListener("click", redirectionJavascript);
    tag.addEventListener("click", tabFilter);
  });

  function redirectionJavascript() {
    document.location.href = "/index.html";
  }
  function tabFilter(e) {
    e.preventDefault();
    let tagsTab = document.querySelectorAll(".tagsTab");
    tagsTab.forEach((tag) => {
      tag.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(tag);
        chooseTag(e.target.innerHTML);
      });
    });
  }

  function chooseTag(e) {
    e.preventDefault();
    let tagsTab = document.querySelectorAll(".tagsTab");
    let tags = document.querySelectorAll(".photographesTagList");
    console.log(tagsTab);
    let vignettes = document.querySelectorAll(".vignettePhotographes");

    vignettes.forEach((vignette) => {
      console.log(vignette.innerHTML);
      let includeResult = vignette.innerHTML.includes(e);

      tags.forEach(function () {
        if (includeResult === false) {
          console.log(includeResult);

          vignette.style.display = "none";
        } else {
          vignette.style.display = "flex";
        }
      });
    });
  }
};
function count() {
  // Initialisation du compteur
  // function newLikes() {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let sumall = mediaFind.map((item) => item.likes).reduce(reducer);
  let compteur = document.getElementById("compteur");
  compteur.innerHTML = sumall;
  let likes = document.querySelectorAll(".likesBtn");
  likes.forEach((like) => {
    // console.log("Mise en place de l'envent");
    like.addEventListener("click", () => {
      let likescompteur = like.children[0].innerHTML;
      let isLike = like.getAttribute("data-like");

      if (isLike == "false") {
        // console.log("isLike=false");
        like.children[0].innerHTML = ++likescompteur;
        like.setAttribute("data-like", true);
        compteur.innerHTML = ++sumall;
      } else {
        like.children[0].innerHTML = --likescompteur;
        like.setAttribute("data-like", false);
        compteur.innerHTML = --sumall;
      }
      // console.log(isLike);
      // console.log(likescompteur);
      // console.log("compteur de likes");
      // // sumall++;
      // compteur.innerHTML = ++sumall;
    });
  });
  // }
  // function countLikes() {
  //   // console.log("compteur de likes");
  //   // // sumall++;
  //   // compteur.innerHTML = ++sumall;
  // }
  let price = document.getElementById("price");
  infoPerso.forEach((info) => {
    let priceSingle = new photographe(info);
    price.innerHTML += priceSingle.createPrice();
  });
}

const letsModal = function () {
  // Modal(infoPerso);
  // formData();
  // function Modal(infoPerso) {
  let titleModal = document.getElementById("titleModal");
  infoPerso.forEach((info) => {
    let titleSingle = new photographe(info);
    titleModal.innerHTML += titleSingle.createTitleModal();
  });

  function attribuerFocus() {
    document.getElementById("modal").focus();
  }
  // }
  // evennement sur le bouton pour déclencher fonction launchModal
  // function formData() {
  let modalBtn = document.getElementById("persoContactBtn");
  // console.log(modalBtn);
  modalBtn.addEventListener("click", launchModal);
  // }
  modalBtn.addEventListener("click", attribuerFocus);
  //fonction pour afficher la modal formulaire
  function launchModal(e) {
    e.preventDefault();
    const modalbg = document.getElementById("modal");
    const close = document.getElementById("modalClose");
    const likesCount = document.getElementById("likesCount");
    modalbg.style.display = "flex";
    modalbg.setAttribute("aria-hidden", false);
    modalbg.removeAttribute("aria-modal");
    close.addEventListener("click", closeModal);
    likesCount.style.display = "none";
    const modalForm = document.getElementById("modalForm");
    modalForm.addEventListener("click", stopClose);
  }

  function reset() {
    //création de la fonction reset pour réinitialiser tout le formulaire
    const modalForm = document.getElementById("modalForm");
    modalForm.reset();
  }
  function closeModal(e) {
    e.preventDefault();
    const modalbg = document.getElementById("modal");
    modalbg.style.display = "none";
    modalbg.setAttribute("aria-hidden", true);
    modalbg.setAttribute("aria-modal", false);
    modalbg.removeEventListener("click", closeModal);
    const close = document.getElementById("modalClose");
    close.removeEventListener("click", closeModal);
    const modalForm = document.getElementById("modalForm");
    modalForm.removeEventListener("click", closeModal);
    const mainPhotographe = document.getElementById("mainPhotographe");
    mainPhotographe.style.display = "block";
    const likesCount = document.getElementById("likesCount");
    likesCount.style.display = "block";
    reset();
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
      reset();
    }
  });

  function stopClose(e) {
    e.stopPropagation();
  }

  const fnElem = document.getElementById("first"); //champ prénom
  const lastElem = document.getElementById("last"); //champ nom
  const mailElem = document.getElementById("email"); //champs email
  const firstRed = document.querySelector(".first-text-control");
  const lastRed = document.querySelector(".last-text-control");
  const mailRed = document.querySelector(".mail-text-control");
  const firstRedBorderForm = document.querySelector(".firstredChamp");
  const lastRedBorderForm = document.querySelector(".lastredChamp");
  const mailRedBorderForm = document.querySelector(".mailredChamp");

  function first() {
    //Regex pour validation du champ prénom
    const fnRegExp = /[a-zA-Z-+]{2,}/g; //plusieurs lettres (min 2)
    let checkFnRegExp = fnRegExp.test(fnElem.value); //comparaison entre regex et valeur du champ
    console.log(fnElem.value);
    if (fnElem.value == "") {
      //si champs vide
      // on affiche un message derreur cf CSS
      firstRedBorderForm.setAttribute(
        "data-error",
        "Veuillez entrer un prénom"
      );
      firstRed.setAttribute("data-error-visible", "true");
      return false;
    }
    if (!checkFnRegExp) {
      //si regex non respectée
      // on affiche un message derreur cf CSS
      firstRedBorderForm.setAttribute(
        "data-error",
        "Veuillez entrer 2 caractères valides ou plus pour le champ du prénom" //message d'erreur
      );
      firstRed.setAttribute("data-error-visible", "true"); // Apparence du message d'erreur cf CSS
      return false;
    } else {
      //autrement
      firstRedBorderForm.removeAttribute("data-error", ""); //suppression du message d'erreur
      firstRed.removeAttribute("data-error-visible", "false"); // supression de la mise en forme CSS
      return true;
    }
  }

  function last() {
    const lastRegExp = /[a-zA-Z-+]{2,30}/g;
    let checklastRegExp = lastRegExp.test(lastElem.value);
    console.log(lastElem.value);
    if (lastElem.value === "") {
      lastRedBorderForm.setAttribute("data-error", "Veuillez indiquer un nom");
      lastRed.setAttribute("data-error-visible", "true");

      return false;
    } else if (!checklastRegExp) {
      lastRedBorderForm.setAttribute(
        "data-error",
        "Veuillez entrer 2 caractères valides ou plus pour le champ du nom"
      );
      lastRed.setAttribute("data-error-visible", "true");
      return false;
    } else {
      lastRedBorderForm.removeAttribute("data-error", "");
      lastRed.removeAttribute("data-error-visible", "false");
      return true;
    }
  }

  function mail() {
    const mailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$/g;
    let checkmailRegExp = mailRegExp.test(mailElem.value);
    console.log(mailElem.value);
    if (mailElem.value === "") {
      mailRedBorderForm.setAttribute(
        "data-error",
        "Veuillez indiquer un email"
      );
      mailRed.setAttribute("data-error-visible", "true");
      return false;
    } else if (!checkmailRegExp) {
      mailRedBorderForm.setAttribute(
        "data-error",
        "Veuillez indiquer un email valide"
      );
      mailRed.setAttribute("data-error-visible", "true");
      return false;
    } else {
      mailRedBorderForm.removeAttribute("data-error", "");
      mailRed.removeAttribute("data-error-visible", "false");
      return true;
    }
  }

  let submitBtn = document.querySelector(".btn-submit");
  submitBtn.addEventListener("click", validation); //evennement sur le bouton submit

  function validation(e) {
    e.preventDefault(); //empêche le comportement par defaut (cad envoi du formulaire)
    let firstResult = first();
    let lastResult = last();
    let mailResult = mail();
    if (
      //si chaque entrée est vérifiée
      firstResult &&
      lastResult &&
      mailResult
    ) {
      closeModal(); //on ferme la modal du formulaire
      reset(); //on réinitialise le formulaire
    } else console.log("STOP!");
    return false;
  }
};

function ligthBox() {
  let litleBox = document.querySelectorAll(".path");
  litleBox.forEach((box) => {
    box.addEventListener("click", launchBox);
    // console.log("hello");
  });

  function launchBox() {
    let main = document.getElementById("mainPhotographe");
    main.style.display = "none";
    let logo = document.getElementById("logoPerso");
    logo.style.display = "none";
    let lightBox = document.getElementById("lightBox");
    lightBox.style.display = "flex";
    lightBox.setAttribute("aria-hidden", false);
    let close = document.getElementById("lightbox__close");
    close.style.display = "flex";
  }

  let imgBox = document.querySelectorAll(".imgBox");
  mediaFind.forEach((media) => {
    let pathMediaBox = new MediaFactory(media);
    imgBox.forEach((box) => {
      box.innerHTML += pathMediaBox.createLightBox();
    });
  });
  let close = document.getElementById("lightbox__close");
  close.addEventListener("click", closeLightBox);

  function closeLightBox(e) {
    e.preventDefault();
    let main = document.getElementById("mainPhotographe");
    main.style.display = "block";
    let logo = document.getElementById("logoPerso");
    logo.style.display = "block";
    let lightBox = document.getElementById("lightBox");
    lightBox.style.display = "none";
    lightBox.setAttribute("aria-hidden", true);
    let close = document.getElementById("lightbox__close");
    close.style.display = "none";
    let allImg = document.querySelectorAll(".lightbox__container");
    allImg.forEach((img) => {
      img.classList.add("hiddenImg");
    });
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeLightBox(e);
    }
  });

  function mediaFilter() {
    let mediaPhotographes = document.querySelectorAll(".mediaPhotographes");
    // console.log(mediaPhotographes);
    mediaPhotographes.forEach((media) => {
      media.children[0].addEventListener("click", function (e) {
        // console.log(media);
        e.preventDefault();
        let mediaBox = media.children[1].children[0].innerHTML;
        console.log(mediaBox);
        chooseMedia(mediaBox);
      });
    });
  }

  mediaFilter();

  function chooseMedia(e) {
    let boxName = document.querySelectorAll(".boxName");
    // console.log(boxName);
    boxName.forEach((titre) => {
      // console.log(titre.innerHTML);
      let includeMedia = titre.innerHTML.includes(e);
      // console.log(includeMedia);
      if (includeMedia === true) {
        titre.parentElement.classList.toggle("hiddenImg");
        launchBox();
      }
    }); // });
  }

  function nextImg() {
    let next = document.getElementById("lightbox__next");
    let container = document.querySelectorAll(".lightbox__container");

    next.addEventListener("click", () => {
      let index;
      for (let i = 0; i < container.length; i++) {
        if (!container[i].classList.contains("hiddenImg")) {
          // console.log(container.length);
          index = i;
        }

        // console.log(container.length);
        if (index === container.length - 1) {
          // console.log("hello");
          // console.log(container[index]);
          // console.log(index);

          container[index].classList.toggle("hiddenImg");
          index = 0;
          container[index + 1].classList.toggle("hiddenImg");
        }
      }
      container[index].classList.toggle("hiddenImg");
      container[index + 1].classList.toggle("hiddenImg");
    });
  }
  nextImg();

  function previousImg() {
    let prev = document.getElementById("lightbox__prev");
    let container = document.querySelectorAll(".lightbox__container");

    prev.addEventListener("click", () => {
      let previndex;

      for (let i = 0; i < container.length; i++) {
        // console.log("boucle for");
        if (!container[i].classList.contains("hiddenImg")) {
          previndex = i;

          // console.log(previndex);
        }

        // console.log(container.length);
        if (previndex === 0) {
          console.log(" hello");
          // console.log(container[previndex]);
          console.log(container[previndex]);
          container[previndex].classList.toggle("hiddenImg");
          previndex = container.length;
          // container[previndex].classList.toggle("hiddenImg");
          console.log(container.length);
          console.log(previndex);
        }
      }
      container[previndex - 1].classList.toggle("hiddenImg");
      container[previndex].classList.toggle("hiddenImg");
    });
  }

  previousImg();

  function attribuerFocusPrev() {
    document.getElementById("lightbox__prev").focus();
  }
  function attribuerFocusNext() {
    document.getElementById("lightbox__next").focus();
  }
  // let prev = document.getElementById("lightbox__prev");
  // let next = document.getElementById("lightbox__next");
  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      console.log(e.key);
      previousImg();
      attribuerFocusPrev();
    }
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      console.log(e.key);
      nextImg();
      attribuerFocusNext();
    }
  });
}

async function init() {
  const data = await getData();
  const dataFiltre = newFilter(data);
  infosAndMedia(dataFiltre);
  count(data);
  letsModal(dataFiltre);
  ligthBox(dataFiltre);
}

init();
