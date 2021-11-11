export class MediaFactory {
  constructor(data) {
    if (data.type === "image") {
      return new img(data);
    } else if (data.type === "video") {
      return new vid(data);
    }
  }
}

export class img {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.type = data.type;
    this.path = data.path;
    this.alt = data.alt;
    this.tags = data.tags;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
  createHTML() {
    return `<section class="mediaPhotographes"">
    <img class="path" src="${this.path}" alt="${this.alt}">
     <section class="infoMedia">
    <p class="title">${this.title}</p>    
    <button class="likesBtn" data-like="false">
    <p class="likes">${this.likes}</p>
    <i class="fas fa-heart"></i>
    </button>
    <p class="dateTri">${this.date}</p>
    </section>
    </section>`;
  }

  createLightBox() {
    return `
        <div class="lightbox__container hiddenImg">
          <img id="bigBox" src="${this.path}" alt="${this.alt}" />
          <p class="boxName">${this.title} </p>
        </div>`;
  }
}

export class vid {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.type = data.type;
    this.path = data.path;
    this.alt = data.alt;
    this.tags = data.tags;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
  createHTML() {
    return `<section class="mediaPhotographes">
    <video controls class="path"><source src="${this.path}" alt="${this.alt}"></></video>
    <section class="infoMedia">
    <p class="title">${this.title}</p>
    <button class="likesBtn">
    <p class="likes">${this.likes}</p>
    <i class="fas fa-heart"></i>
    </button>
    <p class="dateTri">${this.date}</p>
    </section>
    </section>
    `;
  }

  createLightBox() {
    return `

        <div class="lightbox__container hiddenImg">
          <video class="bigBox" src="${this.path}" alt="${this.alt}" />
          <p class="boxName">${this.title}
        </div>`;
  }
}
