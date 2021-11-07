import { MediaFactory } from "./MediaFactory.js";
import { img } from "./MediaFactory.js";
import { vid } from "./MediaFactory.js";
import { photographe } from "./Photographes.js";

const url = "./src/FishEyeData.json";
let infoPerso = 0;
let mediaFind = 0;
let searchParams = [];
const getData = async () =>
  await fetch(url).then((response) => response.json());

const newFilter = (data) => {
  let paramsString = window.location.search;
  let searchParams = new URLSearchParams(paramsString);
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

const infosAndMedia = (data) => {
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
    let main = document.getElementById("pageMedia");
    main.innerHTML = "";
    mediaFind.forEach((media) => {
      let singleMediaFind = new MediaFactory(media);
      // console.log(mediaFind);

      main.innerHTML += singleMediaFind.createHTML();
    });
  }
  displayMedia(data.mediaFind);

  function displayPhotographers(infoPerso) {
    let persoPhotographes = document.getElementById("pagePerso");
    infoPerso.forEach((info) => {
      let persoSingle = new photographe(info);
      persoPhotographes.innerHTML += persoSingle.createPagePhotographes();
    });
  }
  displayPhotographers(data.infoPerso);

  // function tabTri(data) {
  let choixTri = document.getElementById("choixTri");
  // console.log(choixTri);
  choixTri.addEventListener("change", function (e) {
    e.preventDefault();
    // console.log("dans l'event de mon change");
    chooseTri(e.target.value, data.mediaFind);
  });
  // }
  // tabTri();

  function chooseTri(option, mediaatrier) {
    // console.log(option);
    const mediasTrie = mediaatrier.sort((a, b) => {
      if (option == "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (option == "popularite") {
        return b.likes - a.likes;
      } else if (option == "titre") {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
      }
    });

    displayMedia(mediasTrie);
  }
  // });
};
const count = (data) => {
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
};
const letsModal = (data) => {
  // Modal(infoPerso);

  // formData();

  // function Modal(infoPerso) {
  let titleModal = document.getElementById("titleModal");
  infoPerso.forEach((info) => {
    let titleSingle = new photographe(info);
    titleModal.innerHTML += titleSingle.createTitleModal();
  });
  // }

  // evennement sur le bouton pour déclencher fonction launchModal
  // function formData() {
  let modalBtn = document.getElementById("persoContactBtn");
  // console.log(modalBtn);
  modalBtn.addEventListener("click", launchModal);
  // }
  //fonction pour afficher la modal formulaire
  function launchModal(e) {
    const modalbg = document.getElementById("modal");
    const close = document.getElementById("modalClose");
    const likesCount = document.getElementById("likesCount");
    e.preventDefault();
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
  const messRed = document.querySelector(".mess-text-control");
  const firstRedBorderForm = document.querySelector(".firstredChamp");
  const lastRedBorderForm = document.querySelector(".lastredChamp");
  const mailRedBorderForm = document.querySelector(".mailredChamp");
  const messRedBorderForm = document.querySelector(".messredChamp");

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
const ligthBox = (data) => {
  let litleBox = document.querySelectorAll(".path");
  litleBox.forEach((box) => {
    box.addEventListener("click", launchBox);
  });

  function launchBox(e) {
    let main = document.getElementById("mainPhotographe");
    main.style.display = "none";
    let logo = document.getElementById("logoPerso");
    logo.style.display = "none";
    let lightBox = document.getElementById("lightBox");
    lightBox.style.display = "flex";
    lightBox.setAttribute("aria-hidden", false);
    let close = document.getElementById("lightbox__close");
    close.style.display = "block";
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
      media.addEventListener("click", function (e) {
        // console.log(media);
        e.preventDefault();
        let mediaBox = media.children[1].children[0].innerHTML;
        // console.log(mediaBox);
        chooseMedia(mediaBox);
      });
    });
  }

  mediaFilter();

  function chooseMedia(e) {
    let boxName = document.querySelectorAll(".boxName");
    // console.log(boxName);
    boxName.forEach((titre) => {
      console.log(titre.innerHTML);
      let includeMedia = titre.innerHTML.includes(e);
      console.log(includeMedia);

      if (includeMedia === true) {
        titre.parentElement.classList.toggle("hiddenImg");
        closeLightBox();
      }
    }); // });
  }

  let prev = document.getElementById("lightbox__prev");
  let next = document.getElementById("lightbox__next");
  prev.addEventListener("click", changeSlide(-1));
  next.addEventListener("click", changeSlide(1));

  function changeSlide(sens) {
    let boxName = document.querySelectorAll(".boxName");
    let slide = [];
    slide.push(boxName);
    console.log(slide);
    let numero = 0;
    numero = numero + sens;
    console.log(numero);
    if (numero < 0) {
      numero = slide.length - 1;
    } else if (numero > slide.length - 1) numero = 0;
    // document.querySelector("slide");
    // console.log(slide);
  }
};

const init = async () => {
  const data = await getData();
  const dataFiltre = newFilter(data);
  infosAndMedia(dataFiltre);
  const dataCount = count(data);
  letsModal(dataFiltre);
  ligthBox(dataFiltre);
};

init();
