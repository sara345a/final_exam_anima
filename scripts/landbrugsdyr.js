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


let animalData;


//Henter json data og starter højskole-siden (async for at få loadet json før man går videre)
async function hentData() {
    console.log("hentData");


    const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/100/"
    const respons = await fetch(link);
    const json = await respons.json();

    //vis splash
    vis(json);

    //filtrer fagene
    filterContent();
}

//Indsætter data fra wordpress på rette pladser på forsiden
function vis(data) {
    console.log("vis");

    document.querySelector(".picture_one").style.backgroundImage = "url(" + data.splash1.guid + ")";
    document.querySelector(".text h1").textContent = data.splash_overskrift1;
    document.querySelector(".text p").textContent = data.splash_tekst1;

}

//filtrer fagene efter faggruppe og viser dem
async function filterContent() {

  
    const animalLink = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/dyr_posts/"
    const responsAnimal = await fetch(animalLink);
    const jsonAnimal = await responsAnimal.json();
    /* let filtrerede; */
    console.log("Det virker!!!");

    console.log(jsonAnimal);

    //filtrer efter kategori og vis
    jsonAnimal.forEach((animalData) => {
        if (animalData.kategori =="landbrugsdyr_omdyr") {
            const klon = document.querySelector("#animal_template").cloneNode(true).content;
            klon.querySelector(".animal_article h2").textContent = animalData.title.rendered;
            klon.querySelector(".animal_article p").textContent = animalData.beskrivende_tekst;
            klon.querySelector(".animal_article .top-banner").style.backgroundImage = "url(" + animalData.baggrundsbillede.guid + ")";
            klon.querySelector("#fold_content").innerHTML = animalData.content.rendered;

            /* klon.querySelector("button").id = animalData.slug;
            klon.querySelector("button").addEventListener("click", visMere);


            klon.querySelector(".mere").id = animalData.slug + "mere";
            klon.querySelector(".mere").innerHTML = animalData.content.rendered; */

            document.querySelector("#animal_content").appendChild(klon);
            console.log("appendChild");
        }
    })
}

/* function visMere() {
    console.log("viser mere info");

    if (this.classList.contains("lukket")) {
        this.classList = "open"
        document.querySelector("#" + this.id + "mere").style.display = "block";
    } else {
        this.classList = "lukket"
        document.querySelector("#" + this.id + "mere").style.display = "none";
    }


} */
