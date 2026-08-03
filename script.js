/* ==========================================================
   AYMP COSMIC ZODIAC
   SCRIPT.JS V2.0
   PART 1
========================================================== */

/* ===========================
   JSON DATABASE
=========================== */

const JSON_URL =
"./all_zodiac_v1.json";

/* ===========================
   GLOBAL VARIABLES
=========================== */

let zodiacDatabase = {};

let currentPrediction = null;

let currentZodiac = "";

let currentDay = "";

/* ===========================
   LOAD DATABASE
=========================== */

async function loadDatabase() {

    try {

        console.log("Loading Zodiac Database...");

        const response = await fetch(JSON_URL);

        if (!response.ok) {

            throw new Error("JSON Database Not Found");

        }

        zodiacDatabase = await response.json();

        console.log("Database Loaded Successfully");

        console.log(zodiacDatabase);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load Zodiac Database.");

    }

}

/* ===========================
   FIND ZODIAC
=========================== */

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

/* ===========================
   GET TODAY NUMBER
=========================== */

function getTodayPrediction() {

    const today = new Date();

    let number = today.getDate();

    if (number > 50) {

        number = ((number - 1) % 50) + 1;

    }

    return "Day" + number;

}
/* ==========================================================
   PART 2
   INITIALIZE + START PREDICTION
========================================================== */

/* ===========================
   INITIALIZE
=========================== */

async function initialize() {

    await loadDatabase();

    document.getElementById("loading").style.display = "none";

    document.getElementById("resultPanel").style.display = "none";

    console.log("AYMP Zodiac Ready");

}

/* ===========================
   START PREDICTION
=========================== */

function startPrediction() {

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

    currentDay = getTodayPrediction();

    console.log("Name :", username);

    console.log("DOB :", dob);

    console.log("Zodiac :", currentZodiac);

    console.log("Prediction :", currentDay);

    if (!zodiacDatabase[currentZodiac]) {

        alert("Zodiac Data Not Found");

        document.getElementById("loading").style.display = "none";

        return;

    }

    currentPrediction =
        zodiacDatabase[currentZodiac][currentDay];

    if (!currentPrediction) {

        alert("Prediction Not Found");

        document.getElementById("loading").style.display = "none";

        return;

    }

    displayPrediction(username);

}
/* ==========================================================
   PART 3
   DISPLAY PREDICTION
========================================================== */

function displayPrediction(username) {

    document.getElementById("loading").style.display = "none";

    document.getElementById("resultPanel").style.display = "block";

    /* ===========================
       USER DETAILS
    =========================== */

    document.getElementById("resultName").innerHTML =
        username;

    document.getElementById("resultZodiac").innerHTML =
        currentZodiac;

    document.getElementById("resultDay").innerHTML =
        currentDay;

    /* ===========================
       TODAY PREDICTION
    =========================== */

    document.getElementById("prediction").innerHTML =
        currentPrediction.Prediction;

    /* ===========================
       LUCKY DETAILS
    =========================== */

    document.getElementById("luckyNumber").innerHTML =
        currentPrediction.LuckyNumber;

    document.getElementById("luckyColor").innerHTML =
        currentPrediction.LuckyColor;

    document.getElementById("luckyDirection").innerHTML =
        currentPrediction.LuckyDirection;

    document.getElementById("luckyTime").innerHTML =
        currentPrediction.LuckyTime;

    /* ===========================
       GOD & MANTRA
    =========================== */

    document.getElementById("god").innerHTML =
        currentPrediction.God;

    document.getElementById("mantra").innerHTML =
        currentPrediction.Mantra;

    /* ===========================
       ACTION IMAGE
    =========================== */

    document.getElementById("actionImage").src =
        "images/action/" + currentPrediction.Action;

    document.getElementById("actionImage").alt =
        currentPrediction.Action;

    /* ===========================
       PARIHARAM IMAGE
    =========================== */

    document.getElementById("pariharamImage").src =
        "images/pariharam/" + currentPrediction.Pariharam;

    document.getElementById("pariharamImage").alt =
        currentPrediction.Pariharam;

    console.log("Prediction Displayed Successfully");

}
/* ==========================================================
   PART 4
   WINDOW LOAD + RESET + EVENTS
========================================================== */

/* ===========================
   RESET FORM
=========================== */

function resetForm() {

    document.getElementById("username").value = "";

    document.getElementById("dob").value = "";

    document.getElementById("resultPanel").style.display = "none";

    document.getElementById("loading").style.display = "none";

    currentPrediction = null;

    currentZodiac = "";

    currentDay = "";

    console.log("Form Reset Successfully");

}

/* ===========================
   ENTER KEY SUPPORT
=========================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        startPrediction();

    }

});

/* ===========================
   PAGE INITIALIZATION
=========================== */

window.onload = async function () {

    document.getElementById("loading").style.display = "block";

    await initialize();

    console.log("==============================");

    console.log("AYMP Cosmic Zodiac");

    console.log("Database Loaded Successfully");

    console.log("Ready For Prediction");

    console.log("==============================");

};

/* ===========================
   IMAGE ERROR HANDLING
=========================== */

document.addEventListener("DOMContentLoaded", function () {

    const actionImage = document.getElementById("actionImage");

    const pariharamImage = document.getElementById("pariharamImage");

    actionImage.onerror = function () {

        this.src = "images/default.png";

    };

    pariharamImage.onerror = function () {

        this.src = "images/default.png";

    };

});
/* ==========================================================
   PART 5
   FINAL UTILITIES
========================================================== */

/* ===========================
   VERSION
=========================== */

function version() {

    return "AYMP Cosmic Zodiac Engine v2.0";

}

console.log(version());

/* ===========================
   DEVELOPER INFO
=========================== */

console.log("================================");

console.log("AYMP Cosmic Zodiac");

console.log("Powered By AYMP");

console.log("Developer Version : 2.0");

console.log("================================");

/* ===========================
   DATABASE CHECK
=========================== */

function databaseReady() {

    return Object.keys(zodiacDatabase).length > 0;

}

/* ===========================
   SAFE START
=========================== */

function safeStartPrediction() {

    if (!databaseReady()) {

        alert("Database Not Loaded.");

        return;

    }

    startPrediction();

}

/* ===========================
   CLEAR RESULT
=========================== */

function clearResult() {

    document.getElementById("prediction").innerHTML = "";

    document.getElementById("luckyNumber").innerHTML = "";

    document.getElementById("luckyColor").innerHTML = "";

    document.getElementById("luckyDirection").innerHTML = "";

    document.getElementById("luckyTime").innerHTML = "";

    document.getElementById("god").innerHTML = "";

    document.getElementById("mantra").innerHTML = "";

    document.getElementById("actionImage").src = "";

    document.getElementById("pariharamImage").src = "";

}

/* ===========================
   AUTO RESET BEFORE NEW SEARCH
=========================== */

document.getElementById("username").addEventListener("focus", function () {

    clearResult();

});

document.getElementById("dob").addEventListener("focus", function () {

    clearResult();

});

/* ===========================
   SCRIPT END
=========================== */

console.log("================================");

console.log("AYMP Cosmic Zodiac Ready");

console.log("System Loaded Successfully");

console.log("Waiting For User Input");

console.log("================================");
