/* */ //////////////////////////BRUGER MENU/////////////////////////////////////////// */
window.addEventListener("DOMContentLoaded", initPage);
function initPage() {
  const menu = document.querySelector("#burger_menu");
  const menuLinks = document.querySelector(".nav_container");

  menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });
}
///////////////////////////STICKY NAVBAR WHEN SCROLL///////////////////////////////////////////
window.onscroll = function () {
  makeNavbarSticky();
};
// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function makeNavbarSticky() {
  if (window.scrollY > 50) {
    navbar.classList.add("sticky");
    navbar.classList.add("background_color");
  } else {
    navbar.classList.remove("sticky");
    navbar.classList.remove("background_color");
  }
}

///////////////////////////HENT DATAL///////////////////////////////////////////

document.addEventListener("DOMContentLoaded", hentData);

//Henter json data og starter forsiden (async for at få loadet json før man går videre)

async function hentData() {
  console.log("hentData");

  const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/98/";

  const respons = await fetch(link);

  const json = await respons.json();

  //vis forsiden
  vis(json);
}

async function vis(data) {
  console.log("vis");

  document.querySelector(".picture_one").style.backgroundImage =
    "url(" + data.splash1.guid + ")";
  document.querySelector(".text h1").textContent = data.splash_overskrift1;
  document.querySelector(".text p").textContent = data.splash_tekst1;

  document.querySelector("#icon_1 img").src = data.ikon1.guid;
  document.querySelector("#icon_1 h4").textContent = data.ikon_overskrift1;
  document.querySelector("#icon_1 p").textContent = data.ikon_tekst1;
  document.querySelector("#icon_2 img").src = data.ikon2.guid;
  document.querySelector("#icon_2 h4").textContent = data.ikon_overskrift2;
  document.querySelector("#icon_2 p").textContent = data.ikon_tekst2;
  document.querySelector("#icon_3 img").src = data.ikon3.guid;
  document.querySelector("#icon_3 h4").textContent = data.ikon_overskrift3;
  document.querySelector("#icon_3 p").textContent = data.ikon_tekst3;

  document.querySelector(".two-third_right h3").textContent = data.overskrift1;
  document.querySelector(".two-third_right p").textContent = data.tekstfelt1;
  document.querySelector(".two-third_left img").src =
    data.indholdsbillede1.guid;
}
