const songs = [
  {
    songImg: "https://i.scdn.co/image/ab67616d0000485136032cb4acd9df050bc2e197",
    songTitle: "APT.",
    singerName: "ROSÉ",
    secondSinger: "Bruno Mars",
    album: "APT.",
    songDuration: "2:49",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d0000485162d2665fd1709d37ec634ec2",
    songTitle: "BAD PARENTING FUNK",
    singerName: "DJ CEREJASS",
    secondSinger: "Sayfalse",
    album: "BAD PARENTING FUNK",
    songDuration: "1:27",
  },
  {
    songImg: "	https://i.scdn.co/image/ab67616d0000485111434fd28e36bd2a083e5079",
    songTitle: "Victory Anthem",
    singerName: "Khushi TDT",
    secondSinger: "Lash curry",
    thirdSinger: "Audiocrackerr",
    album: "Victory Anthem",
    songDuration: "2:37",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d00004851773c5f60bcb309ef8802e4ef",
    songTitle: 'Raanjhan (From "Do Patti")',
    singerName: "Sachet-Parampara",
    secondSinger: "Parampara Tandon",
    thirdSinger: "Kausar Munir",
    album: 'Raanjhan (From "Do Patti")',
    songDuration: "4:00",
  },
  {
    songImg: "	https://i.scdn.co/image/ab67616d000048514aaf2413384c1efcc38353c6",
    songTitle: "Blood Sweat & Tears (from the series Arcane League of Legends)",
    singerName: "Sheryl Lee Ralph",
    secondSinger: "Arcane",
    thirdSinger: "League of Legends",
    album: "Blood Sweat & Tears (from the series Arcane League of Legends)",
    songDuration: "3:42",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d00004851ee19ea48939f4eafe486b1dc",
    songTitle: "En Ontra Vida",
    singerName: "Yami Safdie",
    secondSinger: "Lasso",
    album: "En Ontra Vida",
    songDuration: "2:33",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d00004851ff9efa742106d47f8136d55e",
    songTitle: "Menina de Vermelho",
    singerName: "MC Menor JP",
    secondSinger: "RAMONMIX",
    thirdSinger: "The Ironix",
    album: "Menina de Vermelho",
    songDuration: "2:31",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d000048511dac3694b3289cd903cb3acf",
    songTitle: "That's So True",
    singerName: "Gracie Abrams",
    album: "The Secret of Us (Deluxe)",
    songDuration: "2:46",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d00004851c105fb55474f224476c23008",
    songTitle: "Born With a Broken Heart",
    singerName: "Damiano David",
    album: "Born With a Broken Heart",
    songDuration: "3:28",
  },
  {
    songImg: "	https://i.scdn.co/image/ab67616d00004851f3eaae22e1c6b26400073c05",
    songTitle: 'Popular - From "Wicked" Original Broadway Cast Recording/2003',
    singerName: "Stephen Schwartz",
    secondSinger: "Kristin Chenoweth",
    thirdSinger: "Stephen Oremus",
    fourthSinger: "Alex Lacamoire",
    album: "Wicked",
    songDuration: "3:44",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d00004851e0f754cbb1bf632f9289865c",
    songTitle: "Headlock",
    singerName: "Imogen Heap",
    album: "Speak for Yourself",
    songDuration: "3:35",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d0000485156ac7b86e090f307e218e9c8",
    songTitle: "7 rings",
    singerName: "Ariana Grande",
    album: "thank u, next",
    songDuration: "2:58",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d00004851a1db745e63940bc06985dea5",
    songTitle: "Santa Tell Me",
    singerName: "Ariana Grande",
    album: "Santa Tell Me",
    songDuration: "3:24",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d00001e025675e83f707f1d7271e5cf8a",
    songTitle: "Believer",
    singerName: "Imagine Dragons",
    album: "Evolve",
    songDuration: "3:24",
  },
  {
    songImg: "https://i.scdn.co/image/ab67616d00001e025675e83f707f1d7271e5cf8a",
    songTitle: "Thunder",
    singerName: "Imagine Dragons",
    album: "Evolve",
    songDuration: "3:07",
  },
];

const $inputSearch = document.querySelector('input[id="searchbar"]');
const $clearButtonSearch = document.getElementById("searchbar__clear-button");
const $mainSectionContainer = document.querySelector(".js-main-content");
const $searchingSong = document.querySelector(".js-search");

// EVENT PER CATTURARE IL CLICK DEL BUTTON PER CANCELLARE LETTERE INSERITE NELLA SEARCH
$clearButtonSearch.addEventListener("click", () => {
  $inputSearch.value = "";
  $mainSectionContainer.classList.remove("displaying-hidden");
  $inputSearch.focus();
});

// CONTROLLA QUANTI CANTANTI CONTIENE L'OGGETTO E RESTITUSCE LA STRINGA DA UTILIZZARE PER LA CREAZIONE DELL'ELEMENTO CARD
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

// CICLA L'ARRAY PASSSATO DALLA FUNZIONE filterSong PER CREARE L'ELEMENTO CARD DA MOSTRARE IN PAGINA
function displaySongs(filteredSong) {
  // RIMUOVE GLI ELEMENTI PASSATI PER LA NUOVA RICERCA
  const songElements = $searchingSong.querySelectorAll(".container_viral50");
  songElements.forEach((element) => element.remove());

  filteredSong.forEach((song, index) => {
    const singers = numberOfSingers(song);
    const $songElement = document.createElement("div");
    $songElement.classList.add("container_viral50");

    $songElement.innerHTML = `<div class="container_viral50">
        <!--DIV SONG-->
        <div class="container">
          <div class="flex center invisible_phone">
            <!--Numero-->
            <p class="song_position">${index + 1}</p>
            <span>
              <svg viewBox="0 0 24 24" class="play_icon basic_features">
                <path
                  d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                ></path>
              </svg>
            </span>
          </div>
          <div class="flex">
            <!--Title-->
            <img
              src="${song.songImg}"
              alt="Icona album ${song.album}."
              class="album_cover"
            />
            <div class="height shorten">
              <p class="bold_white shorten tooltip-song"  data-tooltip="${
                song.songTitle
              }">${song.songTitle}</p>
              <span class="font_small tag_43 tooltip-singer" data-tooltip="${
                singers.singerList
              }"
                >${singers.singer}</span
              >
            </div>
          </div>
          <div class="flex invisible">
            <!--Album-->
            <p
              class="font_small hover_white_underlined shorten tag_43 tooltip-album"
              data-tooltip="${song.album}"
            >
              ${song.album}
            </p>
          </div>
          <div class="flex duration">
            <!--Duration-->
            <button class="opacity tag_43 tooltip-add" >
              <svg viewBox="0 0 16 16" class="basic_features">
                <path
                  d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                ></path>
                <path
                  d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"
                ></path>
              </svg>
            </button>
            <p class="font_small">${song.songDuration}</p>
            <button class="opacity tag_30 tooltip-overflow-menu" data-tooltip="${`Altre opzioni per ${song.songTitle} di ${singers.singerList}`}">
              <svg viewBox="0 0 16 16" class="basic_features">
                <path
                  d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>`;

    $searchingSong.appendChild($songElement);
  });
}

// EVENT PER CATTURARE IL TESTO DELLA SEARCH
$inputSearch.addEventListener("keyup", (e) => {
  const searchText = e.target.value;
  if (searchText) {
    $mainSectionContainer.classList.add("displaying-hidden");
    $searchingSong.classList.remove("displaying-hidden");

    filterSong(songs, searchText, (filteredSong) => {
      displaySongs(filteredSong);
    });
  } else {
    $mainSectionContainer.classList.remove("displaying-hidden");
    $searchingSong.classList.add("displaying-hidden");
  }
});
