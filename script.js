/* ==========================================================
   AYMP COSMIC ZODIAC
   SCRIPT.JS - PART 1
   Database + Zodiac Functions
========================================================== */

//==========================================================
// JSON DATABASE
//==========================================================

const JSON_URL =
"https://aymponsomu.github.io/AYMP--Zodiac-Database/all_zodiac_v1.json";

let zodiacDatabase = {};

//==========================================================
// LOAD DATABASE
//==========================================================

async function loadDatabase() {

    try {

        const response = await fetch(JSON_URL);

        if (!response.ok) {
            throw new Error("Unable to load Zodiac Database");
        }

        zodiacDatabase = await response.json();

        console.log("✅ Zodiac Database Loaded");

    }

    catch (error) {

        console.error(error);

        alert("Unable to load Zodiac Database.");

    }

}

//==========================================================
// FIND ZODIAC
//==========================================================

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

//==========================================================
// DAY CALCULATOR (1 - 50)
//==========================================================

function getPredictionDay(date) {

    const today = new Date();

    const birth = new Date(date);

    let value =
        today.getDate() +
        today.getMonth() +
        birth.getDate() +
        birth.getMonth();

    value = (value % 50);

    if (value === 0)
        value = 50;

    return "Day" + value;

}

//==========================================================
// IMAGE PATH
//==========================================================

function imagePath(fileName) {

    return "images/" + fileName;

}

console.log("PART 1 Loaded Successfully");
//==========================================================
// START PREDICTION
// PART 2
//==========================================================

async function startPrediction() {

    if (Object.keys(zodiacDatabase).length === 0) {
        await loadDatabase();
    }

    const name = document.getElementById("username").value.trim();
    const dob = document.getElementById("dob").value;

    if (name === "") {
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

    const zodiac = getZodiac(day, month);

    const predictionDay = getPredictionDay(dob);

    if (!zodiacDatabase[zodiac]) {
        document.getElementById("loading").style.display = "none";
        alert("Zodiac Data Not Found");
        return;
    }

    const todayData = zodiacDatabase[zodiac][predictionDay];

    if (!todayData) {
        document.getElementById("loading").style.display = "none";
        alert("Prediction Data Not Found");
        return;
    }

    document.getElementById("resultPanel").style.display = "block";

    document.getElementById("resultName").innerText = name;
    document.getElementById("resultZodiac").innerText = zodiac;
    document.getElementById("resultDay").innerText = predictionDay;

    document.getElementById("prediction").innerText =
        todayData.Prediction;

    document.getElementById("luckyNumber").innerText =
        todayData.LuckyNumber;

    document.getElementById("luckyColor").innerText =
        todayData.LuckyColor;

    document.getElementById("luckyDirection").innerText =
        todayData.LuckyDirection;

    document.getElementById("luckyTime").innerText =
        todayData.LuckyTime;

    document.getElementById("god").innerText =
        todayData.God;

    document.getElementById("mantra").innerText =
        todayData.Mantra;

    console.log("Prediction Loaded Successfully");
    }
//==========================================================
// PART 3
// IMAGE + INITIALIZE + EVENTS
//==========================================================

//----------------------------------------------------------
// UPDATE IMAGES
//----------------------------------------------------------

document.getElementById("actionImage").src =
    imagePath(todayData.Action);

document.getElementById("pariharamImage").src =
    imagePath(todayData.Pariharam);

//----------------------------------------------------------
// LOADING OFF
//----------------------------------------------------------

document.getElementById("loading").style.display = "none";

}

//==========================================================
// INITIALIZE
//==========================================================

async function initializeEngine() {

    document.getElementById("loading").style.display = "none";

    document.getElementById("resultPanel").style.display = "none";

    await loadDatabase();

    console.log("AYMP Zodiac Engine Ready");

}

//==========================================================
// ENTER KEY SUPPORT
//==========================================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        startPrediction();

    }

});

//==========================================================
// WINDOW LOAD
//==========================================================

window.onload = async function () {

    await initializeEngine();

};

//==========================================================
// VERSION
//==========================================================

console.log("=================================");
console.log("AYMP COSMIC ZODIAC");
console.log("Version : 2.0");
console.log("Powered By AYMP");
console.log("=================================");
