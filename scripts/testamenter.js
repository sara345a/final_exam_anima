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

  const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/92/";

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
    document.querySelector("#top_column .textbox h3").textContent = data.overskrift1;
    document.querySelector("#top_column .textbox p").textContent = data.tekstfelt1;
    document.querySelector("#top_column img").src = data.indholdsbillede1.guid;
    document.querySelector("#bottom_column .textbox h3").textContent = data.overskrift2;
    document.querySelector("#bottom_column .textbox p").textContent = data.tekstfelt2;
    document.querySelector("#bottom_column img").src = data.indholdsbillede2.guid;
}


