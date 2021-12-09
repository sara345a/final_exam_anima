document.addEventListener("DOMContentLoaded", hentData);


//Henter json data og starter forsiden (async for at få loadet json før man går videre)
async function hentData() {
    console.log("hentData");

    const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/26/"
    const respons = await fetch(link);
    const json = await respons.json();

    //vis forsiden
    visSplash(json);
}

//Indsætter data fra wordpress på rette pladser på forsiden
async function visSplash(data) {
    console.log("vis");

    document.querySelector("#splash").style.backgroundImage = "url(" + data.splash1.guid + ")";
    document.querySelector("#title").textContent = data.title.rendered;
    document.querySelector("#blog_splashtext").innerHTML = data.content.rendered;




    const postlink = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/blog_posts/71"
    const responspost = await fetch(postlink);
    const jsonpost = await responspost.json();

    visArticle(jsonpost)
}


    function visArticle(jsonpost) {

        document.querySelector("#article_content").textContent = jsonpost.content.rendered;



}
