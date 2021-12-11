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

let template = document.querySelector("template");

//Henter json data og starter forsiden (async for at få loadet json før man går videre)
async function hentData() {
    console.log("hentData");

    const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/26/"
    const respons = await fetch(link);
    const json = await respons.json();

    //vis forsiden
    vis(json);
}

//Indsætter data fra wordpress på rette pladser på forsiden
async function vis(data) {
    console.log("vis");

    document.querySelector(".picture_one").style.backgroundImage = "url(" + data.splash1.guid + ")";
    




    const postlink = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/blog_posts"
    const responspost = await fetch(postlink);
    const jsonpost = await responspost.json();
    let filtrerede;
    console.log("Det virker!!!");

    console.log(jsonpost);

    //filtrer efter kategori og vis
    jsonpost.forEach((post) => {
        const klon = template.cloneNode(true).content;
        klon.querySelector(".post_h2").textContent = post.title.rendered;
        klon.querySelector(".post_excerpt").innerHTML = post.excerpt.rendered;
        klon.querySelector(".post_image").src = post.blog_posts.guid;
        document.querySelector("#blogcontent").appendChild(klon);
        console.log("appendChild");

    })


}


