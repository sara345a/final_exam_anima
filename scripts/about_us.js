/* */ //////////////////////////BRUGER MENU/////////////////////////////////////////// */
window.addEventListener("DOMContentLoaded", initPage);
function initPage() {
  const menu = document.querySelector("#burger_menu");
  const menuLinks = document.querySelector(".nav_container");

  menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
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

  const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/om_os/240";

  const respons = await fetch(link);

  const json = await respons.json();

  //vis forsiden
  vis(json);
}

async function vis(data) {
  console.log("vis");

  document.querySelector(".picture_one").style.backgroundImage =
    "url(" + data.splash.guid + ")";
  document.querySelector(".text h1").textContent = data.splash_overskrift;
  document.querySelector(".text p").textContent = data.splash_tekst;
  document.querySelector(".two-third_left .h2_1").textContent =
    data.voresarbejde_overskrift;
  document.querySelector(".two-third_left .para_1").textContent =
    data.tekstfelt1;
  document.querySelector(".two-third_left .h3_1").textContent =
    data.underoverskrift1;
  document.querySelector(".two-third_left .para_2").textContent =
    data.tekstfelt2;

  document.querySelector(".two-third_right .subheader").textContent =
    data.milepaele_overskrift;
  document.querySelector(".two-third_right .h4_1").textContent =
    data.ikon_tekst1;
  document.querySelector(".two-third_right .icon_1").src = data.ikon1.guid;

  document.querySelector(".two-third_right .h4_2").textContent =
    data.ikon_tekst2;
  document.querySelector(".two-third_right .icon_2").src = data.ikon2.guid;

  document.querySelector(".two-third_right .h4_3").textContent =
    data.ikon_tekst3;
  document.querySelector(".two-third_right .icon_3").src = data.ikon3.guid;

  document.querySelector(".banner_container h2").textContent =
    data.ekstra_overskrift;
  document.querySelector(".banner_container img").src =
    data.indholdsbillede.guid;

  document.querySelector(".timeline h2").textContent =
    data.voreshistorie_overskrift;
}
