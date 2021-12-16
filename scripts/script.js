"use strict";
///////////////////////////BRUGER MENU///////////////////////////////////////////
window.addEventListener("DOMContentLoaded", initPage);
function initPage() {
  const menu = document.querySelector("#burger_menu");
  const menuLinks = document.querySelector(".nav_container");

  menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });

  fadeIn();
}

//////////////////////PRIVATLIVSPOLITIK FADE-IN///////////////////////////////////////////

function fadeIn() {
  document.querySelector("#fixed_box").classList.add("fade_in");
}
///////////////////////////SLIDESHOW///////////////////////////////////////////
var slideIndex = 0;
showSlides();
var slides, dots;
var i;
function showSlides() {
  slides = document.querySelectorAll(".mySlides");
  dots = document.querySelectorAll(".dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 5500);
}

function plusSlides(position) {
  slideIndex += position;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  } else if (slideIndex < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function currentSlide(index) {
  if (index > slides.length) {
    index = 1;
  } else if (index < 1) {
    index = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[index - 1].style.display = "block";
  dots[index - 1].className += " active";
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

  const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/2/";

  const respons = await fetch(link);

  const json = await respons.json();

  //vis forsiden
  vis(json);
}

async function vis(data) {
  console.log("vis");

  document.querySelector(".picture_one").style.backgroundImage =
    "url(" + data.splash1.guid + ")";
  document.querySelector(".picture_two").style.backgroundImage =
    "url(" + data.splash2.guid + ")";
  document.querySelector(".picture_three").style.backgroundImage =
    "url(" + data.splash3.guid + ")";
  document.querySelector(".first h1").textContent = data.splash_overskrift1;
  document.querySelector(".second h1").textContent = data.splash_overskrift2;
  document.querySelector(".third h1").textContent = data.splash_overskrift3;
  document.querySelector(".call-to-action_box .icon_1").src = data.ikon1.guid;
  document.querySelector(".call-to-action_box .h2_1").textContent =
    data.ikon_overskrift1;
  document.querySelector(".call-to-action_box .para_1").textContent =
    data.ikon_tekst1;
  document.querySelector(".call-to-action_box .icon_2").src = data.ikon2.guid;
  document.querySelector(".call-to-action_box .h2_2").textContent =
    data.ikon_overskrift2;
  document.querySelector(".call-to-action_box .para_2").textContent =
    data.ikon_tekst2;
  document.querySelector(".call-to-action_box .icon_3").src = data.ikon3.guid;
  document.querySelector(".call-to-action_box .h2_3").textContent =
    data.ikon_overskrift3;
  document.querySelector(".call-to-action_box .para_3").textContent =
    data.ikon_tekst3;
  document.querySelector(".two-third_right h2").textContent = data.overskrift1;
  document.querySelector(".two-third_right p").textContent = data.tekstfelt1;
  document.querySelector(".two-third_left img").src =
    data.indholdsbillede1.guid;
  document.querySelector(".newsletter_wrapper").style.backgroundImage =
    "url(" + data.indholdsbillede2.guid + ")";
}

function flowFunction() {
  var thankYouMessage = document.getElementById("thank_you_message");
  var formContent = document.getElementById("input_content");
  var formInputs = document.getElementById("input_fields");
  thankYouMessage.classList.toggle("hide");
  formContent.classList.toggle("hide");
  formInputs.classList.toggle("hide");
}
