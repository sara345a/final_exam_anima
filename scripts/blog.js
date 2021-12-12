document.addEventListener("DOMContentLoaded", hentData);

let template = document.querySelector("#post_template");
let categoryTemplate = document.querySelector("#category_template");

let jsonpost;
let categoryJson;
let json;

//Henter json data og starter forsiden (async for at få loadet json før man går videre)
async function hentData() {
    console.log("hentData");

    const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/26/"
    const respons = await fetch(link);
    json = await respons.json();

    const postlink = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/blog_posts"
    const responspost = await fetch(postlink);
    jsonpost = await responspost.json();

    const categoryLink = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/categories"
    const categoryRespons = await fetch(categoryLink);
    categoryJson = await categoryRespons.json();

    //vis forsiden
    vis();
    addButtons();

}

//Indsætter data fra wordpress på rette pladser på forsiden
async function vis() {
    console.log("vis");

    document.querySelector("#splash").style.backgroundImage = "url(" + json.splash1.guid + ")";
    document.querySelector("#title").textContent = json.title.rendered;
    document.querySelector("#blog_splashtext").innerHTML = json.content.rendered;

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


function filterClicked(buttonClicked){

    debugger;

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
            klon.querySelector(".post_image").src = post.blog_posts.guid;
            document.querySelector("#blogcontent").appendChild(klon);
            console.log("appendChild");
    
            }
            
    
        })

    }
}

async function addButtons(){

    categoryJson.forEach((category) => {
        if(category.name == "Ikke-kategoriseret"){
            return;
        }
        const klon = categoryTemplate.cloneNode(true).content;
        klon.querySelector(".filter_btn").innerHTML = category.name;
        klon.querySelector(".filter_btn").val = category.id;

        document.querySelector("#button_box").appendChild(klon);
    })

    document.querySelectorAll('.filter_btn').forEach(btn => {
        btn.addEventListener('click', filterClicked)
      })

}


