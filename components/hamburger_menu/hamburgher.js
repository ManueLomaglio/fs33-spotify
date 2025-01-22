//selettori dei bottoni

const $hamburgherCloseMenu = document.querySelector(".button_close_menu");
const $hamburherShowMenu = document.querySelector("#hamburgher_menu");//non esiste in html
//selettore del menu 
const $hamburgherMenu = document.querySelector('.hamburger_wrapper');

// funzioni del menu
const openMenuFunction=function(){
   // $hamburgherMenu.style.visibility = "visible";
  $hamburgherMenu.setAttribute("aria-expanded", "true");
}
const closeMenuFunction = function () {
  //$hamburgherMenu.style.visibility = "hidden";
  $hamburgherMenu.setAttribute("aria-expanded", "false");
};

//eventi

$hamburgherCloseMenu.addEventListener("click", closeMenuFunction);

$hamburherShowMenu.addEventListener("click",openMenuFunction);

// const toggleButton = document.querySelector('#hamburgher_menu');
// const slidingPanel = document.querySelector('.hamburger_wrapper');

// // Function to toggle the sliding panel
// const togglePanel = () => {
//   const isExpanded = slidingPanel.getAttribute('aria-expanded') === 'true';

//   if (isExpanded) {
//     slidingPanel.setAttribute('aria-expanded', 'false');
//     slidingPanel.style.visibility = 'hidden'; 
//   } else {
//     slidingPanel.setAttribute('aria-expanded', 'true');
//     slidingPanel.style.visibility = 'visible'; 
//   }
// };

// // event listener al bottone
// toggleButton.addEventListener('click', togglePanel);
