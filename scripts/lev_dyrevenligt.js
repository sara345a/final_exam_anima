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

let template = document.querySelector("#post_template");
let categoryTemplate = document.querySelector("#category_template");

let jsonpost;
let categoryJson;
let json;

const categoryIds = [];

//Henter json data og starter forsiden (async for at få loadet json før man går videre)
async function hentData() {
    console.log("hentData");

    const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/145/"
    const respons = await fetch(link);
    json = await respons.json();

    const postlink = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/lev_dyrevenligt_post"
    const responspost = await fetch(postlink);
    jsonpost = await responspost.json();

    const categoryLink = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/categories"
    const categoryRespons = await fetch(categoryLink);
    categoryJson = await categoryRespons.json();

    //vis forsiden
    vis();
    addButtons();
    postButtons();

}

//Indsætter data fra wordpress på rette pladser på forsiden
async function vis() {
    console.log("vis");

    document.querySelector(".picture_one").style.backgroundImage = "url(" + json.splash1.guid + ")";
    document.querySelector(".text h1").textContent = json.splash_overskrift1;
    document.querySelector(".text p").textContent = json.splash_tekst1;
    document.querySelector("#bottom_column img").src = json.indholdsbillede1.guid;
    document.querySelector("#top_column .textbox h3").textContent = json.overskrift1;
    document.querySelector("#top_column .textbox p").textContent = json.tekstfelt1;
    document.querySelector("#top_column img").src = json.indholdsbillede2.guid;
  

    //filtrer efter kategori og vis
    jsonpost.forEach((post) => {
        const klon = template.cloneNode(true).content;
        klon.querySelector(".post_h2").textContent = post.title.rendered;
        klon.querySelector(".post_excerpt").innerHTML = post.excerpt.rendered;
        klon.querySelector(".post_image").src = post.underskriv_posts.guid;
        klon.querySelector(".post_button").val = post.id;
        document.querySelector("#blogcontent").appendChild(klon);
        console.log("appendChild");

        let ids = post.categories;
        ids.forEach(id => {
          categoryIds.push(id);
        });

    })


}


function filterClicked(buttonClicked){

    let categoryId = buttonClicked.target.val;

    document.querySelector("#blogcontent").innerHTML = "";

    if(buttonClicked.target.innerHTML == "Alle"){
        vis();
    } else {
        jsonpost.forEach((post) => {
        
            const categories = post.categories;
            if(categories.includes(categoryId)){
                const klon = template.cloneNode(true).content;
            klon.querySelector(".post_h2").textContent = post.title.rendered;
            klon.querySelector(".post_excerpt").innerHTML = post.excerpt.rendered;
            klon.querySelector(".post_image").src = post.underskriv_posts.guid;
            klon.querySelector(".post_button").val = post.id;
            document.querySelector("#blogcontent").appendChild(klon);
            console.log("appendChild");
    
            }
            
    
        })

    }
}

async function addButtons(){

  categoryJson.forEach((category) => {

    if(categoryIds.includes(category.id) || category.name == "Alle"){
      const klon = categoryTemplate.cloneNode(true).content;
      klon.querySelector(".filter_btn").innerHTML = category.name;
      klon.querySelector(".filter_btn").val = category.id;

      document.querySelector("#button_box").appendChild(klon);
    }

      
  })

  document.querySelectorAll('.filter_btn').forEach(btn => {
      btn.addEventListener('click', filterClicked)
    })

}

function postButtons(){
  document.querySelectorAll('.post_button').forEach(btn => {
    btn.addEventListener('click', postButtonClicked)
  })
}

function postButtonClicked(){
  
  let postId = this.val;
  sessionStorage.setItem("postId", postId);
  window.location.href = "lev_dyrevenligt_underside.html";
}



