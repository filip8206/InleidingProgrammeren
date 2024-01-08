console.log("verbonden");
//plaatjes arrays
var blaadjesAfbeeldingen = ["img/blaadjes/0.png", "img/blaadjes/1.png", "img/blaadjes/2.png", "img/blaadjes/3.png", "img/blaadjes/4.png", "img/blaadjes/5.png", "img/blaadjes/6.png", "img/blaadjes/7.png", "img/blaadjes/8.png", "img/blaadjes/9.png", "img/blaadjes/10.png", "img/blaadjes/11.png", "img/blaadjes/12.png", "img/blaadjes/13.png", "img/blaadjes/14.png", "img/blaadjes/15.png", "img/blaadjes/16.png", "img/blaadjes/17.png", "img/blaadjes/18.png", "img/blaadjes/19.png", "img/blaadjes/20.png", "img/blaadjes/21.png", "img/blaadjes/22.png", "img/blaadjes/23.png", "img/blaadjes/24.png", "img/blaadjes/25.png"];
var gezichtjesAfbeeldingen = ["img/gezichtjes/neutraal.png", "img/gezichtjes/lovesme.png", "img/gezichtjes/lovesmenot.png", "img/gezichtjes/reallylovesme.png", "img/gezichtjes/reallylovesmenot.png"];
var audioControlAfbeeldingen = ["img/speakeraan.png", "img/speakeruit.png"];

//querySelector variabelen
var plukkenButton = document.querySelector("button#plukken");
var volgendeButton = document.querySelector("button#volgende");
var actieveSpelerText = document.querySelector("em#actievespeler");
var lovesmeText = document.querySelector("h1#lovesme");
var speler1ScoreText = document.querySelector("b#speler1");
var speler2ScoreText = document.querySelector("b#speler2");
var blaadjesResterendText = document.querySelector("p#resterendeblaadjes");
var nieuwSpelButton = document.querySelector("button#nieuwspel");
var bloemAfbeelding = document.querySelector("img#bloem")
var gezichtAfbeelding = document.querySelector("img#gezicht");
var instructiePopup = document.querySelector("div#popup");
var popupButton = document.querySelector("button#popupbutton");
var speluitlegButton = document.querySelector("h3#uitlegbutton");
var audioBestand = document.querySelector("audio#backgroundmusic");
var audioControl = document.querySelector("img#musiccontrol");

//score variabelen
var blaadjes = Math.floor(Math.random() * (25 - 21 + 1)) + 21;
var actieveSpeler = Math.floor(Math.random() * 2) + 1;
var gepluktBeurt = 0;
var lovesMe = Math.random() >= 0.5;
var spelEinde = false;
var speler1Score = 0;
var speler2Score = 0;
var spelEindeGewonnen = true;
var spelEindeSpeler = 1;



//Bij startup
bloemAfbeelding.src = blaadjesAfbeeldingen[blaadjes];
actieveSpelerText.textContent = actieveSpeler;
if (lovesMe == true) {
    lovesmeText.textContent = "Loves me";
    lovesmeText.className = "";
    lovesmeText.classList.add("lovesme");
    gezichtAfbeelding.src = gezichtjesAfbeeldingen[1];
} else {
    lovesmeText.textContent = "Loves me not";
    lovesmeText.className = "";
    lovesmeText.classList.add("lovesmenot");
    gezichtAfbeelding.src = gezichtjesAfbeeldingen[2];
}

if (actieveSpeler == 1) {
    actieveSpelerText.classList.add("speler1");
    actieveSpelerText.classList.remove("speler2");
} else {
    actieveSpelerText.classList.add("speler2");
    actieveSpelerText.classList.remove("speler1");
}
volgendeButton.disabled = true;



function popupVerbergen() {
    instructiePopup.classList.add("nodisplay");
}
function popupWeergeven() {
    instructiePopup.classList.remove("nodisplay");
}


//Deze functie kijkt welke speler heeft gewonnen of verloren en kent een punt toe en verandert de tekst.
//Deze functie wordt alleen uitgevoerd wanneer er geen blaadjes meer over zijn en het spel is afgelopen.
function spelEindeScoreRegelaar() {
    if (lovesMe == true) {
        if (actieveSpeler == 1) {
            speler1Score += 1;
            blaadjesResterendText.textContent = "Speler 1 heeft een punt gekregen!"
            console.log("Speler 1 heeft gewonnen");
        } else {
            speler2Score += 1;
            blaadjesResterendText.textContent = "Speler 2 heeft een punt gekregen!"
            console.log("Speler 2 heeft gewonnen");
        }
        lovesmeText.textContent = "REALLY loves me!!!";
        lovesmeText.className = "";
        lovesmeText.classList.add("reallylovesme");
        gezichtAfbeelding.src = gezichtjesAfbeeldingen[3];
    } else {
        if (actieveSpeler == 1) {
            speler2Score += 1;
            blaadjesResterendText.textContent = "Speler 2 heeft een punt gekregen!"
            console.log("Speler 2 heeft gewonnen");
        } else {
            speler1Score += 1;
            blaadjesResterendText.textContent = "Speler 1 heeft een punt gekregen!"
            console.log("Speler 1 heeft gewonnen");
        }
        lovesmeText.textContent = "REALLY loves me NOT!"
        lovesmeText.className = "";
        lovesmeText.classList.add("reallylovesmenot");
        gezichtAfbeelding.src = gezichtjesAfbeeldingen[4];
    }
    //De volgende twee regels werken het scorebord bij.
    speler1ScoreText.textContent = speler1Score;
    speler2ScoreText.textContent = speler2Score;

    blaadjesResterendText.classList.remove("invisible");
    volgendeButton.disabled = false;
    volgendeButton.textContent = "Nieuw spel";
}



//Deze functie checkt of de blaadjes al op zijn en eindigd het spel als het zo is.
function blaadjesChecker() {
    if (blaadjes == 0) {
        plukkenButton.disabled = true;
        volgendeButton.disabled = true;
        blaadjesResterendText.classList.add("invisible");
        spelEinde = true;
        plukkenButton.classList.add("nodisplay");
        //volgendeButton.textContent = "Nieuw spel";
        gezichtAfbeelding.src = gezichtjesAfbeeldingen[0];
        lovesmeText.textContent = "Really loves..."
        lovesmeText.className = "";
        lovesmeText.classList.add("reallyloves");
        //De SetTimeout voert de functie uit na 2 seconden die de punten toekent en de bloem verandert aan het einde van het spel.
        setTimeout(() => { spelEindeScoreRegelaar() }, 2000);
    }
}



//Deze functie checkt of iemand al 3 keer een blaadje heeft geplukt in dezelfde beurt.
function beurtChecker() {
    if (gepluktBeurt >= 3) {
        plukkenButton.disabled = true;
    }
}



//Deze functie wordt uitgevoerd wanneer er op de knop 'pluk een blaajde' wordt geklikt.
function plukken() {
    console.log("blaadje geplukt");
    blaadjes -= 1;
    bloemAfbeelding.src = blaadjesAfbeeldingen[blaadjes];
    gepluktBeurt += 1;
    if (lovesMe == true) {
        lovesMe = false
        lovesmeText.textContent = "Loves me not";
        lovesmeText.className = "";
        lovesmeText.classList.add("lovesmenot");
        gezichtAfbeelding.src = gezichtjesAfbeeldingen[2];
    } else {
        lovesMe = true
        lovesmeText.textContent = "Loves me";
        lovesmeText.className = "";
        lovesmeText.classList.add("lovesme");
        gezichtAfbeelding.src = gezichtjesAfbeeldingen[1];
    }
    blaadjesResterendText.textContent = "Je kan nog " + (3 - gepluktBeurt) + " blaadjes plukken."
    if (gepluktBeurt == 2) {
        blaadjesResterendText.textContent = "Je kan nog 1 blaadje plukken."
    } else if (gepluktBeurt >= 3) {
        blaadjesResterendText.textContent = "Je kan geen blaadjes meer plukken."
    }
    blaadjesChecker();
    beurtChecker();
    //volgende statement zorgt er voor dat de 'volgende' knop niet wordt enabled wanneer het spel is afgelopen
    if (spelEinde == false) {
        volgendeButton.disabled = false;
    }
}



//Deze functie wordt uitgevoerd wanneer er op de knop 'volgende' wordt geklikt.
function volgende() {
    if (spelEinde == true) {
        //Alles binnen deze voorwaarde wordt uitgevoerd wanneer er een nieuw spel wordt gestart
        blaadjes = Math.floor(Math.random() * (25 - 21 + 1)) + 21;
        lovesMe = Math.random() >= 0.5;
        spelEinde = false;
        plukkenButton.classList.remove("nodisplay");
        volgendeButton.textContent = "Volgende";
        bloemAfbeelding.src = blaadjesAfbeeldingen[blaadjes];
        if (lovesMe == true) {
            lovesmeText.textContent = "Loves me";
            lovesmeText.className = "";
            lovesmeText.classList.add("lovesme");
            gezichtAfbeelding.src = gezichtjesAfbeeldingen[1];
        } else {
            lovesmeText.textContent = "Loves me not";
            lovesmeText.className = "";
            lovesmeText.classList.add("lovesmenot");
            gezichtAfbeelding.src = gezichtjesAfbeeldingen[2];
        }
    }
    else {
        if (actieveSpeler == 1) {
            actieveSpeler = 2;
            actieveSpelerText.classList.remove("speler1");
            actieveSpelerText.classList.add("speler2");
        } else {
            actieveSpeler = 1;
            actieveSpelerText.classList.remove("speler2");
            actieveSpelerText.classList.add("speler1");
        }
    }
    actieveSpelerText.textContent = actieveSpeler;
    gepluktBeurt = 0;
    plukkenButton.disabled = false;
    volgendeButton.disabled = true;
    blaadjesResterendText.textContent = "Je kan nog 3 blaadjes plukken."

}

//Onderstaande functie zorgt ervoor de achtergrondmuziek speelt en pauzeert wanneer er op de speaker wordt geklikt.
//Onderstaande functie is deels geschreven door chatGPT, opgevraagd op 24 mei 2023.
//Code is herschreven zodat het past en werkt met mijn website.
function achtergrondMuziek() {
    if (audioBestand.paused == true) {
        audioBestand.play();
        audioControl.src = audioControlAfbeeldingen[0];
    } else {
        audioBestand.pause();
        audioControl.src = audioControlAfbeeldingen[1];
    }
}



//eventListeners
plukkenButton.addEventListener("click", plukken);
volgendeButton.addEventListener("click", volgende);
popupButton.addEventListener("click", popupVerbergen);
speluitlegButton.addEventListener("click", popupWeergeven);
audioControl.addEventListener('click', achtergrondMuziek);

//Onderstaande code zorgt ervoor dat er een waarschuwing wordt weergegeven wanneer de gebruiker de pagina wil herladen,
//omdat de scores resetten wanneer de pagina herlaadt.
//Onderstaande code is geschreven door chatGPT, opgevraagd op 23 mei 2023
//If statement met spelerscores is wel zelf gemaakt zodat de prompt niet wordt weergegeven als er nog geen punten zijn toegekend.
function confirmReload(event) {
    if (speler1Score != 0 || speler2Score != 0) {
        event.preventDefault();
        event.returnValue = '';

        // Customize the confirmation message
        var confirmationMessage = 'Are you sure you want to reload this page?';

        // Display the confirmation dialog
        if (typeof event === 'undefined') {
            event = window.event;
        }
        if (event) {
            event.returnValue = confirmationMessage;
        }

        return confirmationMessage;
    }
}

window.addEventListener('beforeunload', confirmReload);
