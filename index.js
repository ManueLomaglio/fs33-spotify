const $inputSearch = document.querySelector('input[id="searchbar"]');

const $clearButtonSearch = document.getElementById("searchbar__clear-button");

// ATTUALMENTE IN LAVORAZIONE
$clearButtonSearch.addEventListener("click", () => {
  $inputSearch.value = "";
  $inputSearch.focus();
});

const $mainSectionContainer = document.querySelector(".sections-container");
const $searchingSong = document.querySelector(".search-song");

// MOSTRA LA LISTA DI CANZONI NASCOSTE QUANDO SI INSERISCE UNA LETTERE NEL SEARCH
$inputSearch.addEventListener("keyup", (e) => {
  if (e.target.value) {
    $mainSectionContainer.classList.add("displaying-search");
    $searchingSong.classList.remove("displaying-search");
  } else {
    $mainSectionContainer.classList.remove("displaying-search");
    $searchingSong.classList.add("displaying-search");
  }
});
