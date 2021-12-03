import { MediaFactory } from "./MediaFactory.js";
import { photographe } from "./Photographes.js";

const url = "./src/FishEyeData.json";
let infoPerso;
let mediaFind;
let searchParams;

// récupération des données JSON
const getData = async () =>
  await fetch(url).then((response) => response.json());

// récupération de l'id photographes pour créer page perso
// récupération des médias pour chaque photographe
const newFilter = (data) => {
  let paramsString = window.location.search;
  searchParams = new URLSearchParams(paramsString);
  searchParams.getAll("=");
  searchParams.forEach((params) => {
    infoPerso = data.photographers.filter((info) => info.id == params);
    mediaFind = data.media.filter(
      (element) => element.photographerId == params
    );
  });
  return { infoPerso, mediaFind };
};

// Insertion du code pour vignettes média dans page photographe
const infosAndMedia = () => {
  function displayMedia(mediaFind) {
    let main = document.getElementById("pageMedia");
    mediaFind.forEach((media) => {
      let singleMediaFind = new MediaFactory(media);
      main.innerHTML += singleMediaFind.createHTML();
    });
  }
  displayMedia(mediaFind);

  // Insertion du code pour infos photographe sur la page perso
  function displayPhotographers(infoPerso) {
    let persoPhotographes = document.getElementById("pagePerso");
    infoPerso.forEach((info) => {
      let persoSingle = new photographe(info);
      persoPhotographes.innerHTML += persoSingle.createPagePhotographes();
    });
  }
  displayPhotographers(infoPerso);

  // Event et option de tri
  let choix = document.getElementById("choixTri");
  choix.addEventListener("change", function (e) {
    chooseTri(e.target.value, mediaFind);
  });

  // Tri en fonction du choix
  function chooseTri(option, mediaatrier) {
    let pages = document.getElementById("pageMedia");
    const mediaTries = mediaatrier.sort((a, b) => {
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

    let imgBox = document.querySelector(".imgBox");
    imgBox.innerHTML = "";
    count();
    lightBox(mediaTries);
  }

  // redirection tags photographes vers page d'accueil
  let tagsTab = document.querySelectorAll(".tagsTab");
  tagsTab.forEach((tag) => {
    tag.addEventListener("click", redirectionJavascript);
    // tag.addEventListener("click", tabFilter);
  });

  function redirectionJavascript() {
    document.location.href = "./index.html";
  }
};

// Comptage des likes (incrémentation et décrémentation)
function count() {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let sumall = mediaFind.map((item) => item.likes).reduce(reducer);
  let compteur = document.getElementById("compteur");
  compteur.innerHTML = sumall;
  let likes = document.querySelectorAll(".likesBtn");
  likes.forEach((like) => {
    like.addEventListener("click", () => {
      let likescompteur = like.children[0].innerHTML;
      let isLike = like.getAttribute("data-like");

      if (isLike == "false") {
        like.children[0].innerHTML = ++likescompteur;
        like.setAttribute("data-like", true);
        compteur.innerHTML = ++sumall;
      } else {
        like.children[0].innerHTML = --likescompteur;
        like.setAttribute("data-like", false);
        compteur.innerHTML = --sumall;
      }
    });
  });
}

const price = function () {
  // Récupéation du code pour affichage de prix
  let price = document.getElementById("price");
  infoPerso.forEach((info) => {
    let priceSingle = new photographe(info);
    price.innerHTML += priceSingle.createPrice();
  });
};

// Création de la modal
const letsModal = function () {
  let titleModal = document.getElementById("titleModal");
  infoPerso.forEach((info) => {
    let titleSingle = new photographe(info);
    titleModal.innerHTML += titleSingle.createTitleModal();
  });

  //  fonction pour donner le focus à la modal
  function attribuerFocus() {
    document.getElementById("modalClose").focus();
  }

  let modalBtn = document.getElementById("persoContactBtn");
  modalBtn.addEventListener("click", launchModal);
  modalBtn.addEventListener("click", attribuerFocus);

  // fonction pour afficher la modal formulaire
  function launchModal() {
    const modalbg = document.getElementById("modal");
    const close = document.getElementById("modalClose");
    const cross = document.querySelector(".fa-times");
    const likesCount = document.getElementById("likesCount");
    const pageMedia = document.getElementById("pageMedia");
    pageMedia.setAttribute("aria-hidden", true);
    attribuerFocus();
    modalbg.style.display = "flex";
    modalbg.setAttribute("aria-hidden", false);
    modalbg.removeAttribute("aria-modal");
    close.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal();
      reset();
    });
    close.setAttribute("aria-hidden", false);
    cross.setAttribute("aria-hidden", false);
    likesCount.style.display = "none";
  }
  //création de la fonction reset pour réinitialiser tout le formulaire
  function reset() {
    const modalForm = document.getElementById("modalForm");
    modalForm.reset();
    firstRedBorderForm.removeAttribute("data-error", ""); //suppression du message d'erreur
    firstRed.removeAttribute("data-error-visible", false); // supression de la mise en forme CSS
    lastRedBorderForm.removeAttribute("data-error", "");
    lastRed.removeAttribute("data-error-visible", false);
    mailRedBorderForm.removeAttribute("data-error", "");
    mailRed.removeAttribute("data-error-visible", false);
  }

  // Fermeture de la modal
  function closeModal() {
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

  //  Event sur la touche escape et enter
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      reset();
      closeModal();
    }
  });

  modalBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      reset();
      launchModal(e);
      attribuerFocus();
    }
  });

  // Vérification des champs du formulaire
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

  // (cf first)
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

  // (cf first)
  function mail() {
    const mailRegExp = /^[a-zA-Z0-7._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$/g;
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

  // création des ²event pour validation
  let submitBtn = document.querySelector(".btn-submit");
  submitBtn.addEventListener("click", validation); //evennement sur le bouton submit

  let firstControl = document.querySelector(".first-text-control");
  firstControl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      validation(e);
    }
  });

  let lastControl = document.querySelector(".last-text-control");
  lastControl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      validation(e);
    }
  });
  let mailControl = document.querySelector(".mail-text-control");
  mailControl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault;
      validation(e);
    }
  });

  submitBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      validation(e);
    }
  });

  //fonction de validation des champs de la modal
  function validation(e) {
    e.preventDefault();
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
    } else {
      return false;
    }
  }
};

//fonctions events  prev et next de la lightbox
const eventLightBox = function () {
  // Previous et next event
  let prev = document.getElementById("lightbox__prev");
  prev.addEventListener("click", previousImg);
  let next = document.getElementById("lightbox__next");
  next.addEventListener("click", nextImg);

  //Fonctions pour passer img suivante et précédente
  function nextImg() {
    let container = document.querySelectorAll(".lightbox__container");
    let index;
    for (let i = 0; i < container.length; i++) {
      if (!container[i].classList.contains("hiddenImg")) {
        index = i;
        console.log(index);
      }
      if (index === container.length - 1) {
        container[index].classList.toggle("hiddenImg");
        index = 0;
        container[index + 1].classList.toggle("hiddenImg");
      }
    }
    container[index + 1].classList.toggle("hiddenImg");
    if (index !== container.length) {
      container[index].classList.toggle("hiddenImg");
    }
  }

  function previousImg() {
    let container = document.querySelectorAll(".lightbox__container");
    let previndex;
    for (let i = 0; i < container.length; i++) {
      if (!container[i].classList.contains("hiddenImg")) {
        previndex = i;
        console.log(previndex);
      }
      if (previndex === 0) {
        container[previndex].classList.toggle("hiddenImg");
        previndex = container.length;
      }
    }
    container[previndex - 1].classList.toggle("hiddenImg");

    if (previndex !== container.length) {
      container[previndex].classList.toggle("hiddenImg");
    }
  }

  // fonctions pour naviguer avec les flèches du clavier

  function isActive() {
    let boxes = document.getElementById("boxes");
    if (boxes.classList.contains("isActive") == true) {
      console.log("Youpi");
      nextEvent();
    }
  }
  isActive();

  function nextEvent() {
    document.addEventListener("keydown", function (e) {
      console.log(e.key);
      if (e.key === "ArrowRight") {
        nextImg();
      }
    });
  }

  function prevEvent() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        previousImg();
      }
    });
  }
  prevEvent();
};

function lightBox() {
  function lightBoxEvent() {
    // création de l'event lancement de la lightbox
    let litleBox = document.querySelectorAll(".path");
    litleBox.forEach((box) => {
      box.addEventListener("click", launchBox);
    });
    let mediaPhotographes = document.querySelectorAll(".mediaPhotographes");
    mediaPhotographes.forEach((media) => {
      media.children[0].addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          let mediaBox = media.children[1].children[0].innerHTML;
          chooseMedia(mediaBox);
          launchBox(e);
        }
      });
    });
  }
  lightBoxEvent();

  // fonction pour lancer la lightbox
  function launchBox() {
    let main = document.getElementById("mainPhotographe");
    main.style.display = "none";
    let logo = document.getElementById("logoAccueil");
    logo.style.display = "none";
    let boxes = document.getElementById("boxes");
    boxes.style.display = "flex";
    boxes.setAttribute("aria-hidden", false);
    let close = document.getElementById("lightbox__close");
    close.style.display = "flex";
    close.setAttribute("aria-hidden", false);
    let lightbox = document.getElementById("lightBox");
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", false);
    let fermer = document.querySelectorAll(".fermer");
    fermer.forEach((close) => {
      close.setAttribute("aria-hidden", false);
    });
    let prev = document.getElementById("lightbox__prev");
    prev.setAttribute("aria-hidden", false);
    let imgBox = document.querySelectorAll(".imgBox");
    imgBox.forEach((box) => {
      box.setAttribute("aria-hidden", false);
    });
    boxes.classList.add("isActive");
  }
  // Recupération source et nom de la photo pour création du code HTML de la lightbox
  mediaFind.forEach((media) => {
    let imgBox = document.querySelectorAll(".imgBox");
    let pathMediaBox = new MediaFactory(media);
    imgBox.forEach((box) => {
      box.innerHTML += pathMediaBox.createLightBox();
    });
  });

  // fonction pour savoir quelle vignette est cliquée
  function mediaFilter() {
    let mediaPhotographes = document.querySelectorAll(".mediaPhotographes");
    mediaPhotographes.forEach((media) => {
      media.children[0].addEventListener("click", function (e) {
        e.preventDefault();
        let mediaBox = media.children[1].children[0].innerHTML;
        chooseMedia(mediaBox);
      });
    });
  }

  mediaFilter();

  // lancer la bonne lightbox
  function chooseMedia(e) {
    let boxName = document.querySelectorAll(".boxName");
    boxName.forEach((titre) => {
      let includeMedia = titre.innerHTML.includes(e);
      if (includeMedia === true) {
        titre.parentElement.classList.toggle("hiddenImg");
        launchBox();
      }
    });
  }

  // Event pour fermer la lightbox
  let close = document.getElementById("lightbox__close");
  close.addEventListener("click", closeLightBox);

  let crossBox = document.getElementById("crossLightbox");
  crossBox.addEventListener("keydown", closeLightBox);

  // Fermeture de la lightbox
  function closeLightBox() {
    let main = document.getElementById("mainPhotographe");
    main.style.display = "block";
    let logo = document.getElementById("logoAccueil");
    logo.style.display = "block";
    let likesCount = document.getElementById("likesCount");
    likesCount.style.display = "flex";
    let lightbox = document.getElementById("lightBox");
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", true);
    let close = document.getElementById("lightbox__close");
    close.style.display = "none";
    let allImg = document.querySelectorAll(".lightbox__container");
    allImg.forEach((img) => {
      img.classList.add("hiddenImg");
    });
    let boxes = document.getElementById("boxes");
    boxes.classList.remove("isActive");
  }

  // Event sur touche escape - navigation au clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeLightBox(e);
    }
  });
}
// fonction globale d'intialisation de toutes les fonctions
async function init() {
  const data = await getData();
  const dataFiltre = newFilter(data);
  infosAndMedia(dataFiltre);
  count(data);
  price(data);
  letsModal(dataFiltre);
  eventLightBox(dataFiltre);
  lightBox(dataFiltre);
}

init();
