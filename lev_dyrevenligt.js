document.addEventListener("DOMContentLoaded", hentData);

let template = document.querySelector("template");

//Henter json data og starter forsiden (async for at få loadet json før man går videre)
async function hentData() {
    console.log("hentData");

    const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/145/"
    const respons = await fetch(link);
    const json = await respons.json();

    //vis forsiden
    vis(json);
}

//Indsætter data fra wordpress på rette pladser på forsiden
async function vis(data) {
    console.log("vis");

    document.querySelector("#splash").style.backgroundImage = "url(" + data.splash1.guid + ")";
    document.querySelector("#title").textContent = data.title.rendered;
    document.querySelector("#blog_splashtext").innerHTML = data.content.rendered;

    document.querySelector(".textbox h3").textContent = data.overskrift1;
    document.querySelector(".textbox p").textContent = data.tekstfelt1;
    document.querySelector("#img_box img").src = data.indholdsbillede1.guid;

    const postlink = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/blog_posts"
    const responspost = await fetch(postlink);
    const jsonpost = await responspost.json();
    /* let filtrerede; */
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


