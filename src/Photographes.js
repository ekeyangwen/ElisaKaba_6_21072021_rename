export class photographe {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tags = data.tags;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
    this.alt = data.alt;
  }
  createVignette() {
    return `
    <section class="vignettePhotographes">
        <a class="pagePhoto" href="./pagePhotographes.html?id=${this.id}">
        <img  class ="vignette" src="${this.portrait}" alt="${this.alt}">
       </a>
            <p class="name">${this.name}</p>
            <p class="city">${this.city}, ${this.country}</p>
            <p class="tagline">${this.tagline}</p>
            <p class="price">${this.price}€/jour</p>
            <ul class="photographesTagList"> ${this.tags
              .map((tag) => `<li class="tagsTab">#${tag}</li>`)
              .join("")}
            </ul>
    </section>`;
  }

  createPagePhotographes() {
    return `
    <section class ="persoPhoto">
      <section class= "pagePersoPhotographe">
        <p class="namePerso">${this.name}</p>
        <p class="cityPerso">${this.city}, ${this.country}</p>
        <p class="taglinePerso">${this.tagline}</p>
        <ul class="photographesTagListPerso"> ${this.tags
          .map((tag) => `<li class="tagsTab">#${tag}</li>`)
          .join("")}
        </ul>
           
      </section>
      <button id="persoContactBtn">Contactez-moi</button>
        <img class="vignettePerso" src="${this.portrait}" alt="${
      this.alt
    }""></img>
    </section>
  <section class="triPhoto">

<label for="choixTri" class="trier">Trier par</label>
<span class="choose">
  <select name="tri" id="choixTri">
  </span>
      <option value="popularite" class="choix">Popularité</option>
      <option value="date" class="choix">Date</option>
      <option value="titre" class="choix">Titre</option>
     </select>
  </section>`;
  }
  createTitleModal() {
    return `</br>
    ${this.name}`;
  }

  createPrice() {
    return `
    ${this.price}€/jour`;
  }
}
