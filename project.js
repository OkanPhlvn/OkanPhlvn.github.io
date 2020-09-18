const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//Objeler.
const ui = new UI();
const storage = new Storage();

//Tüm eventleri yükle
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });

  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
  filterInput.addEventListener("keyup",filterFilm);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;
  
  if (title === "" || director === "" || url === "") {
    ui.displayMessages("Tüm alanları doldurun...", "danger");
  } 
  else {
    //Yeni film
    const newFilm = new Film(title, director, url);

    ui.addFilmToUI(newFilm); //Arayüze film ekleme
    storage.addFilmToStorage(newFilm); //Storage ekleme.
    ui.displayMessages("Film Başarıyla Eklendi", "success");
  }

  ui.clearInputs(titleElement, directorElement, urlElement);

  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    ui.displayMessages("Silme işlemi başarılı...", "success");
  }
}

function clearAllFilms() {
  if (confirm("Tüm filmleri silmek istediğinizden emin misiniz ?")) {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmFromStorage();
  }
}