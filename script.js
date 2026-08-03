/* ==========================================================
   AYMP COSMIC ZODIAC
   FINAL SCRIPT
   PART 1
========================================================== */

/* ==========================
   DATABASE URL
========================== */

const JSON_URL =
"https://raw.githubusercontent.com/AYMPONSOMU/AYMP--Zodiac-Database/main/all_zodiac_v1.json";

/* ==========================
   GLOBAL VARIABLES
========================== */

let zodiacDatabase = {};

let currentData = null;

let currentZodiac = "";

let currentDay = "";

/* ==========================
   LOAD DATABASE
========================== */

async function loadDatabase() {

    try {

        const response = await fetch(JSON_URL);

        if (!response.ok) {

            throw new Error("Database Not Found");

        }

        zodiacDatabase = await response.json();

        console.log("Database Loaded");

    }

    catch (error) {

        console.error(error);

        alert("Unable to load Zodiac Database.");

    }

}

/* ==========================
   ZODIAC CALCULATOR
========================== */

function getZodiac(day, month) {

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19))
        return "Aries";

    if ((month == 4 && day >= 20) || (month == 5 && day <= 20))
        return "Taurus";

    if ((month == 5 && day >= 21) || (month == 6 && day <= 20))
        return "Gemini";

    if ((month == 6 && day >= 21) || (month == 7 && day <= 22))
        return "Cancer";

    if ((month == 7 && day >= 23) || (month == 8 && day <= 22))
        return "Leo";

    if ((month == 8 && day >= 23) || (month == 9 && day <= 22))
        return "Virgo";

    if ((month == 9 && day >= 23) || (month == 10 && day <= 22))
        return "Libra";

    if ((month == 10 && day >= 23) || (month == 11 && day <= 21))
        return "Scorpio";

    if ((month == 11 && day >= 22) || (month == 12 && day <= 21))
        return "Sagittarius";

    if ((month == 12 && day >= 22) || (month == 1 && day <= 19))
        return "Capricorn";

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18))
        return "Aquarius";

    return "Pisces";

}

/* ==========================
   DAY CALCULATOR
========================== */

function getPredictionDay() {

    let day = new Date().getDate();

    if (day > 50) {

        day = ((day - 1) % 50) + 1;

    }

    return "Day" + day;

}

/* ==========================
   INITIALIZE
========================== */

async function initializeEngine() {

    document.getElementById("loading").style.display = "block";

    document.getElementById("resultPanel").style.display = "none";

    await loadDatabase();

    document.getElementById("loading").style.display = "none";

    console.log("AYMP Zodiac Ready");

}
/* ==========================================================
   FINAL SCRIPT
   PART 2
   START PREDICTION
========================================================== */

async function startPrediction() {

    if (Object.keys(zodiacDatabase).length === 0) {

        await loadDatabase();

    }

    const username =
        document.getElementById("username").value.trim();

    const dob =
        document.getElementById("dob").value;

    if (username === "") {

        alert("Please Enter Your Name");

        return;

    }

    if (dob === "") {

        alert("Please Select Date Of Birth");

        return;

    }

    document.getElementById("loading").style.display = "block";

    const birthDate = new Date(dob);

    const day = birthDate.getDate();

    const month = birthDate.getMonth() + 1;

    currentZodiac = getZodiac(day, month);

    currentDay = getPredictionDay();

    if (!zodiacDatabase[currentZodiac]) {

        document.getElementById("loading").style.display = "none";

        alert("Zodiac Data Not Found");

        return;

    }

    currentData = zodiacDatabase[currentZodiac][currentDay];

    if (!currentData) {

        document.getElementById("loading").style.display = "none";

        alert("Prediction Not Found");

        return;

    }

    displayPrediction(username);

}

/* ==========================================================
   DISPLAY PREDICTION
========================================================== */

function displayPrediction(username) {

    document.getElementById("resultPanel").style.display = "block";

    document.getElementById("loading").style.display = "none";

    document.getElementById("resultName").innerText =
        username;

    document.getElementById("resultZodiac").innerText =
        currentZodiac;

    document.getElementById("resultDay").innerText =
        currentDay;

    document.getElementById("prediction").innerText =
        currentData.Prediction;

    document.getElementById("luckyNumber").innerText =
        currentData.LuckyNumber;

    document.getElementById("luckyColor").innerText =
        currentData.LuckyColor;

    document.getElementById("luckyDirection").innerText =
        currentData.LuckyDirection;

    document.getElementById("luckyTime").innerText =
        currentData.LuckyTime;

    document.getElementById("god").innerText =
        currentData.God;

    document.getElementById("mantra").innerText =
        currentData.Mantra;

    document.getElementById("actionImage").src =
        "images/" + currentData.Action;

    document.getElementById("pariharamImage").src =
        "images/" + currentData.Pariharam;

    console.log("Prediction Loaded Successfully");

       }
/* ==========================================================
   FINAL SCRIPT
   PART 3
========================================================== */

/* ==========================
   IMAGE ERROR HANDLING
========================== */

document.addEventListener("DOMContentLoaded", function () {

    const actionImage = document.getElementById("actionImage");
    const pariharamImage = document.getElementById("pariharamImage");

    if (actionImage) {

        actionImage.onerror = function () {

            this.src = "images/default.png";

        };

    }

    if (pariharamImage) {

        pariharamImage.onerror = function () {

            this.src = "images/default.png";

        };

    }

});

/* ==========================
   ENTER KEY SUPPORT
========================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        startPrediction();

    }

});

/* ==========================
   RESET FORM
========================== */

function resetPrediction() {

    document.getElementById("resultPanel").style.display = "none";

    document.getElementById("loading").style.display = "none";

    currentData = null;

    currentZodiac = "";

    currentDay = "";

}

/* ==========================
   WINDOW LOAD
========================== */

window.onload = async function () {

    await initializeEngine();

    console.log("==============================");

    console.log("AYMP COSMIC ZODIAC");

    console.log("Powered By AYMP");

    console.log("Database Ready");

    console.log("==============================");

};

/* ==========================
   VERSION
========================== */

function version() {

    return "AYMP Zodiac Engine Final v1.0";

}

console.log(version());
