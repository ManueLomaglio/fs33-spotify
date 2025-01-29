// SEZIONE SEARCH
let songs = [];
let $templateSong;
let $htmlSong;
const $searchbar = document.querySelector(".searchbar");
const $inputSearch = document.querySelector('input[id="searchbar"]');
const $clearButtonSearch = document.getElementById("searchbar__clear-button");
const $mainSectionContainer = document.querySelector(".js-main-content");
const $searchingSong = document.querySelector(".js-search");
const $mainContainer = document.querySelector(".js-main-container");
const $btnSearchGlass = document.querySelector(".nav__search-glass__button");
const $logoSpotify = document.querySelector(".nav__logo__container");
const $btnContainerNav = document.querySelector(".nav__buttons__container");
const $navbar = document.querySelector(".navbar");
const $premiumBanner = document.querySelector(".premium-banner");
const $containerBtnGoBack = document.querySelector(
  ".nav__contaniner__btn-back"
);
const $btnGoBack = document.querySelector("#go-back");
const $footer = document.querySelector("#footer_container");
const $TextBeforeSearchMobile = document.querySelector(".before-search-mobile");
const $navSecondPage = document.querySelector(".js-nav-secondPage");
const $loaderSong = document.querySelector(".loader");
let isMobileSearch = false;

fetchTemplate();

// FUNZIONE PER RECUPERO CANZONI
async function fetchSong(cb) {
  try {
    const response = await fetch("songs.json");
    const dataSongs = await response.json();

    if (dataSongs) {
      songs = await dataSongs;
      cb(songs);
    }
  } catch (error) {
    console.log(error);
  }
}

// EVENT PER CATTURARE IL CLICK DEL BUTTON PER CANCELLARE LETTERE INSERITE NELLA SEARCH
$clearButtonSearch.addEventListener("click", () => {
  if (isMobileSearch) {
    $inputSearch.value = "";
    $TextBeforeSearchMobile.classList.remove("displaying-hidden");
    $searchingSong.classList.add("displaying-hidden");
    $inputSearch.focus();
  } else {
    $inputSearch.value = "";
    $mainSectionContainer.classList.remove("displaying-hidden");
    $searchingSong.classList.add("displaying-hidden");
    $inputSearch.focus();
  }
});

// CONTROLLA QUANTI CANTANTI CONTIENE L'OGGETTO E RESTITUSCE LA STRINGA PER MOSTRARE I CANTANTI (OVVERO singer: singerForDisplay) e la lista dei cantanti come stringa (singerList: singerForTooltip)
function numberOfSingers(song) {
  let singerForDisplay = "";
  let singerForTooltip = "";
  if ("fourthSinger" in song) {
    singerForDisplay = `<a href="" class="singerName">${song.singerName}</a>, <a href="" class="singerName">${song.secondSinger}</a>, <a href="" class="singerName">${song.thirdSinger}</a>, <a href="" class="singerName">${song.fourthSinger}</a>`;
    singerForTooltip = `${song.singerName}, ${song.secondSinger}, ${song.thirdSinger}, ${song.fourthSinger}`;
  } else if ("thirdSinger" in song) {
    singerForDisplay = `<a href="" class="singerName">${song.singerName}</a>, <a href="" class="singerName">${song.secondSinger}</a>, <a href="" class="singerName">${song.thirdSinger}</a>`;
    singerForTooltip = `${song.singerName}, ${song.secondSinger}, ${song.thirdSinger}`;
  } else if ("secondSinger" in song) {
    singerForDisplay = `<a href="" class="singerName">${song.singerName}</a>, <a href="" class="singerName">${song.secondSinger}</a>`;
    singerForTooltip = `${song.singerName}, ${song.secondSinger}`;
  } else if ("singerName" in song) {
    singerForDisplay = `<a href="" class="singerName">${song.singerName}</a>`;
    singerForTooltip = `${song.singerName}`;
  }

  return { singer: singerForDisplay, singerList: singerForTooltip };
}

// FILTRA L'ARRAY IN BASE AL CARATTERE DI formattedText E CHIAMA LA CB A CUI PASSA L'ARRAY FILTRATO (SE NON PRESENTE PASSA L'INTERO ARRAY)
function filterSong(songs, searchText, cb) {
  const formattedText = searchText.toLowerCase();
  const filteredSong = songs.filter((song) => {
    return (
      song.songTitle.toLowerCase().includes(formattedText) ||
      song.singerName.toLowerCase().includes(formattedText) ||
      song.secondSinger?.toLowerCase().includes(formattedText) ||
      false ||
      song.thirdSinger?.toLowerCase().includes(formattedText) ||
      false ||
      song.fourthSinger?.toLowerCase().includes(formattedText) ||
      false ||
      song.album.toLowerCase().includes(formattedText)
    );
  });

  if (filteredSong.length > 0) {
    cb(filteredSong);
  } else {
    cb(songs);
  }
}

async function fetchTemplate() {}

// CICLA L'ARRAY PASSSATO DALLA FUNZIONE filterSong PER CREARE L'ELEMENTO CARD DA MOSTRARE IN PAGINA
async function displaySongs(filteredSong) {
  // RIMUOVE GLI ELEMENTI PASSATI PER LA NUOVA RICERCA
  const songElements = $searchingSong.querySelectorAll(".container_viral50");
  songElements.forEach((element) => element.remove());

  if (!$templateSong) {
    try {
      const response = await fetch("templeteSong.html");
      const dataTemplete = await response.text();

      if (dataTemplete) {
        const $htmlForSong = document.createElement("div");
        $htmlForSong.innerHTML = dataTemplete;
        $templateSong = $htmlForSong.querySelector(".container_viral50");
      }
    } catch (error) {
      console.log(error);
    }
  }

  filteredSong.forEach((song, index) => {
    const singers = numberOfSingers(song);

    const templateString = $templateSong.outerHTML;
    const replacedHTML = templateString
      .replace(/{{index}}/g, index + 1)
      .replace(/{{songImg}}/g, song.songImg)
      .replace(
        /{{album}}/g,
        song.album.replace(/"/g, "&quot;").replace(/'/g, "&#39;")
      )
      .replace(
        /{{songTitle}}/g,
        song.songTitle.replace(/"/g, "&quot;").replace(/'/g, "&#39;")
      )
      .replace(/{{singerList}}/g, singers.singerList)
      .replace(/{{singer}}/g, singers.singer)
      .replace(/{{songDuration}}/g, song.songDuration);
    $htmlSong = document.createElement("div");
    $htmlSong.innerHTML = replacedHTML;

    $searchingSong.appendChild($htmlSong.firstChild);
  });
}

// EVENT PER CATTURARE IL TESTO DELLA SEARCH
$inputSearch.addEventListener("keyup", (e) => {
  const searchText = e.target.value;
  if (searchText) {
    $TextBeforeSearchMobile.classList.add("displaying-hidden");
    $mainSectionContainer.classList.add("displaying-hidden");
    $searchingSong.classList.remove("displaying-hidden");
    $mainContainer.style.background = "none";
    $mainContainer.style.backgroundColor = "#121212";

    if (songs.length > 0) {
      // NEL CASO FOSSE STATO POPOLATO L'ARRAY DELLE CANZONI
      filterSong(songs, searchText, (filteredSong) => {
        displaySongs(filteredSong);
      });
    } else {
      // NEL CASO NON FOSSE ANCORA STATO POPOLATO L'ARRAY DELLE CANZONI LO RECUPERO CON IL FETCH
      $loaderSong.classList.remove("displaying-hidden");
      setTimeout(() => {
        fetchSong((songs) => {
          filterSong(songs, searchText, (filteredSong) => {
            displaySongs(filteredSong);
          });
        });

        $loaderSong.classList.add("displaying-hidden");
      }, 1000);
    }
  } else {
    if (isMobileSearch) {
      $TextBeforeSearchMobile.classList.remove("displaying-hidden");
      $searchingSong.classList.add("displaying-hidden");
    } else {
      $mainSectionContainer.classList.remove("displaying-hidden");
      $searchingSong.classList.add("displaying-hidden");
      $mainContainer.style.background =
        "linear-gradient(to bottom, #222222 10%, #121212 20%)";
    }
  }
});

// EVENT PER IL BUTTON SEARCH SU MOBILE
$btnSearchGlass.addEventListener("click", () => {
  isMobileSearch = true;
  //MODIFICHE ALLA NAVBAR
  $logoSpotify.classList.add("displaying-hidden");
  $btnContainerNav.classList.add("displaying-hidden");
  $navbar.style.height = "72px";
  $navbar.style.backgroundColor = "#181818";
  $navbar.style.padding = "12px 16px";
  $navbar.style.position = "unset";
  $searchbar.style.display = "flex";

  $containerBtnGoBack.classList.remove("displaying-hidden");

  //MODIFICHE AL BANNER
  if ($premiumBanner) $premiumBanner.classList.add("displaying-hidden");

  //MODIFICHE AL MAIN
  $mainContainer.style.borderRadius = "0px";
  $mainSectionContainer.classList.add("displaying-hidden");
  $TextBeforeSearchMobile.classList.remove("displaying-hidden");

  //MODIFICHE AL FOOTER
  $footer.classList.add("displaying-hidden");
});

// EVENT PER IL BUTTON BACK  DELLA NAVBAR
$btnGoBack.addEventListener("click", () => {
  isMobileSearch = false;
  // MODIFICHE NAVBAR
  $logoSpotify.classList.remove("displaying-hidden");
  $btnContainerNav.classList.remove("displaying-hidden");
  $navbar.style.position = "fixed";
  $navbar.style.height = "56px";
  $navbar.style.backgroundColor = "#000000";
  $navbar.style.padding = "";
  if ($navSecondPage) $navSecondPage.style.background = "#0D442B";
  $inputSearch.value = "";
  $searchbar.style.display = "none";

  $containerBtnGoBack.classList.add("displaying-hidden");

  // MODIFICHE AL BANNER
  if ($premiumBanner) $premiumBanner.classList.remove("displaying-hidden");

  // MODIFICHE AL MAIN
  $TextBeforeSearchMobile.classList.add("displaying-hidden");
  $mainSectionContainer.classList.remove("displaying-hidden");
  $searchingSong.classList.add("displaying-hidden");

  // MODIFCHE AL FOOTER
  $footer.classList.remove("displaying-hidden");
});

// SEZIONE NEWPLAYLIST
const blueTooltip_btn = document.querySelector(".button_new_playlist");
const blueTooltip_sec = document.querySelector("#blueTooltip_section");
const notNow_btn = document.querySelector("#trasparent");

blueTooltip_btn.addEventListener("click", () => {
  blueTooltip_sec.style.display = "block";
});

// Se il clic non è dentro il tooltip, nascondi la section
document.addEventListener("click", (event) => {
  const insideClick = blueTooltip_sec.contains(event.target);

  if (!insideClick && event.target !== blueTooltip_btn) {
    blueTooltip_sec.style.display = "none";
  }
  if (event.target === notNow_btn) {
    blueTooltip_sec.style.display = "none";
  }
});

//MODAL LANGUAGES
const modalLanguages = document.querySelector(".modal-languages");
const buttonLanguage = document.querySelectorAll(".button_language");
const modalButtonClose = document.querySelector(".modal-button-close");

const openModal = () => {
  modalLanguages.style.display = "flex";
};

const closeModal = () => {
  modalLanguages.style.display = "none";
};

//buttonLanguage.addEventListener("click", openModal);
buttonLanguage.forEach((button) => {
  button.addEventListener("click", openModal);
});
modalButtonClose.addEventListener("click", closeModal);

// Chiude la modal cliccando fuori dal contenitore
modalLanguages.addEventListener("click", (e) => {
  if (e.target === modalLanguages) {
    closeModal();
  }
});
//HAMBURGHER menu
const $hamburgherCloseMenu = document.querySelector(".button_close_menu");
const $hamburherShowMenu = document.querySelector("#hamburgher_menu");
//selettore del menu
const $hamburgherMenu = document.querySelector(".hamburger_wrapper");

// funzioni del menu
const openMenuFunction = function () {
  // $hamburgherMenu.style.visibility = "visible";
  $hamburgherMenu.setAttribute("aria-expanded", "true");
};
const closeMenuFunction = function () {
  //$hamburgherMenu.style.visibility = "hidden";
  $hamburgherMenu.setAttribute("aria-expanded", "false");
};

//eventi

$hamburgherCloseMenu.addEventListener("click", closeMenuFunction);

$hamburherShowMenu.addEventListener("click", openMenuFunction);

//QUI INIZIA LA PARTE JAVASCRIPT DEDICATA ALL'APPARIZIONE DEL TOOLTIP CREA UNA NUOVA PLAYLIST DOPO AVER CLICCATO IL BOTTONE "+"

const $buttonPlus = document.querySelector(".button_plus");

//Evento click che aggiunge e rimuove, se l'elemento già è presente, l'elemento HTML che contiene il button-new-playlist

$buttonPlus.addEventListener("click", function (event) {
  event.stopPropagation(); // Impedisce la propagazione al body

  //Verifica l'esistenza dell'elemento HTML, in caso lo rimuove
  const $existingTooltip = document.querySelector(
    ".main__button-new-playlist__container"
  );

  if ($existingTooltip) {
    $existingTooltip.remove();
    return;
  }

  //Inserisce il nuovo elemento HTML al nodo più vicino, quello di buttoPlus

  $buttonPlus.insertAdjacentHTML(
    "beforeend", // Puoi scegliere dove posizionare il nuovo contenuto
    `<div class="main__button-new-playlist__container">
          <div class="button-new-playlist__container">
            <button class="button-new-playlist">
              <svg class="song-note">
                <path
                  d="M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0H2zm11.5 2.5H8.244A5.482 5.482 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5zM4 8.107a5.465 5.465 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4V8.107zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5z"
                ></path>
              </svg>
              <span class="padding-text">Crea una nuova playlist</span>
            </button>
          </div>
        </div>`
  );

  const $newTooltip = document.querySelector(
    ".main__button-new-playlist__container"
  );

  $newTooltip.addEventListener("click", () => {
    if (blueTooltip_sec) {
      blueTooltip_sec.style.display = "block";
    }
  });

  // Nascondi il blueTooltip_sec nel caso in cui esistesse già

  if (blueTooltip_sec) {
    blueTooltip_sec.style.display = "none";
  }
});

//Funzione per gestire il click all'esterno del componente che è stato appena creato

function handleOutsideClick(event) {
  const $tooltip = document.querySelector(
    ".main__button-new-playlist__container"
  );

  // Se non c'è il tooltip, non fa nulla
  if (!$tooltip) return;

  // Controlla se il click è avvenuto fuori dal tooltip o dal bottone
  if (
    !event.target.closest(".main__button-new-playlist__container") &&
    !event.target.closest(".button_plus")
  ) {
    $tooltip.remove(); // Rimuove il tooltip
    document.removeEventListener("click", handleOutsideClick); // Rimuove l'evento per evitare sovraccarico
  }
}
