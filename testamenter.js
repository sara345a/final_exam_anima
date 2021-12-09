document.addEventListener("DOMContentLoaded", hentData);


//Henter json data og starter forsiden (async for at få loadet json før man går videre)
async function hentData() {
    console.log("hentData");

    const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/92/"
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
    document.querySelector("#top_column .textbox h3").textContent = data.overskrift1;
    document.querySelector("#top_column .textbox p").textContent = data.tekstfelt1;
    document.querySelector("#top_column img").src = data.indholdsbillede1.guid;
    document.querySelector("#bottom_column .textbox h3").textContent = data.overskrift2;
    document.querySelector("#bottom_column .textbox p").textContent = data.tekstfelt2;
    document.querySelector("#bottom_column img").src = data.indholdsbillede2.guid;
}



