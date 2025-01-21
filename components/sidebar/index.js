//Qui inizia la parte JavaScript dedicata all'apparizione del tooltip crea una nuova playlist

const $buttonPlus = document.querySelector(".button_plus");

//Evento click che aggiunge e rimuove, se l'elemento già è presente, l'elemento HTML che contiene il button-new-playlist

$buttonPlus.addEventListener("click", function (event) {
  const $existingTooltip = document.querySelector(
    ".main__button-new-playlist__container"
  );

  //Verifica l'esistenza dell'elemento HTML, in caso lo rimuove

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
  document.addEventListener("click", handleOutsideClick);

  $existingTooltip.addEventListener("click", () => {});
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
