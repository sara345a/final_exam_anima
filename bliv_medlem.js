document.addEventListener("DOMContentLoaded", hentData);

//Henter json data og starter forsiden (async for at få loadet json før man går videre)
async function hentData() {
    console.log("hentData");

    const link = "https://jmotte.dk/eksamen-anima/wp-json/wp/v2/pages/141/"
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
    document.querySelector("#icon_1 img").src = data.ikon1.guid;
    document.querySelector("#icon_1 h4").textContent = data.ikon_overskrift1;
    document.querySelector("#icon_1 p").textContent = data.ikon_tekst1;
    document.querySelector("#icon_2 img").src = data.ikon2.guid;
    document.querySelector("#icon_2 h4").textContent = data.ikon_overskrift2;
    document.querySelector("#icon_2 p").textContent = data.ikon_tekst2;
    document.querySelector("#icon_3 img").src = data.ikon3.guid;
    document.querySelector("#icon_3 h4").textContent = data.ikon_overskrift3;
    document.querySelector("#icon_3 p").textContent = data.ikon_tekst3;

    document.querySelector(".textbox h3").textContent = data.ikon_overskrift1;
    document.querySelector(".textbox p").textContent = data.tekstfelt1;
    document.querySelector("#bottom_column img").src = data.indholdsbillede1.guid;

    
}
