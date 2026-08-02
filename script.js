/* ==========================================================
   AYMP Cosmic Kingdom
   Daily Zodiac Engine
   Part 1
========================================================== */

const JSON_URL =
"https://raw.githubusercontent.com/AYMPONSOMU/AYMP--Zodiac-Database/main/all_zodiac_v1.json";

let zodiacDatabase = {};

/* -------------------------
   Load JSON Database
--------------------------*/

async function loadZodiacDatabase() {

    try {

        const response = await fetch(JSON_URL);

        if (!response.ok) {
            throw new Error("Database Not Found");
        }

        zodiacDatabase = await response.json();

        console.log("Database Loaded Successfully");

    }

    catch(error){

        console.error(error);

        alert("Unable to load Zodiac Database.");

    }

}

/* -------------------------
   Zodiac Calculator
--------------------------*/

function getZodiac(day,month){

    if((month==3 && day>=21)||(month==4 && day<=19))
        return "Aries";

    if((month==4 && day>=20)||(month==5 && day<=20))
        return "Taurus";

    if((month==5 && day>=21)||(month==6 && day<=20))
        return "Gemini";

    if((month==6 && day>=21)||(month==7 && day<=22))
        return "Cancer";

    if((month==7 && day>=23)||(month==8 && day<=22))
        return "Leo";

    if((month==8 && day>=23)||(month==9 && day<=22))
        return "Virgo";

    if((month==9 && day>=23)||(month==10 && day<=22))
        return "Libra";

    if((month==10 && day>=23)||(month==11 && day<=21))
        return "Scorpio";

    if((month==11 && day>=22)||(month==12 && day<=21))
        return "Sagittarius";

    if((month==12 && day>=22)||(month==1 && day<=19))
        return "Capricorn";

    if((month==1 && day>=20)||(month==2 && day<=18))
        return "Aquarius";

    return "Pisces";

}

/* -------------------------
   Day Calculator

   Day1 ---- Day50
--------------------------*/

function getPredictionDay(){

    const today = new Date();

    const day = today.getDate();

    return ((day-1)%50)+1;

}

/* -------------------------
   Start

--------------------------*/

window.onload=async()=>{

    await loadZodiacDatabase();

    console.log("AYMP Zodiac Engine Ready");
/* ==========================================================
   AYMP Cosmic Kingdom
   Daily Zodiac Engine
   Part 2
==========================================================*/

/* -------------------------
   Read User Details
--------------------------*/

function readUserDetails(){

    const name =
    document.getElementById("username").value.trim();

    const dob =
    document.getElementById("dob").value;

    if(name===""){

        alert("Enter your Name");

        return null;

    }

    if(dob===""){

        alert("Select Date Of Birth");

        return null;

    }

    return{

        name:name,

        dob:new Date(dob)

    };

}


/* -------------------------
   Load Today's Prediction
--------------------------*/

function getTodayPrediction(user){

    const birth=user.dob;

    const day=birth.getDate();

    const month=birth.getMonth()+1;

    const zodiac=getZodiac(day,month);

    const predictionDay="Day"+getPredictionDay();

    if(!zodiacDatabase[zodiac]){

        alert("Zodiac Data Missing");

        return null;

    }

    if(!zodiacDatabase[zodiac][predictionDay]){

        alert("Prediction Missing");

        return null;

    }

    return{

        name:user.name,

        zodiac:zodiac,

        day:predictionDay,

        result:zodiacDatabase[zodiac][predictionDay]

    };

}


/* -------------------------
   Button Event
--------------------------*/

function searchPrediction(){

    const user=readUserDetails();

    if(user==null){

        return;

    }

    const data=getTodayPrediction(user);

    if(data==null){

        return;

    }

    showPrediction(data);

}
    /* ==========================================================
   AYMP Cosmic Kingdom
   Daily Zodiac Engine
   Part 3
==========================================================*/

/* -------------------------
   Show Prediction
--------------------------*/

function showPrediction(data){

    const result=data.result;

    document.getElementById("resultName").innerHTML=
    data.name;

    document.getElementById("resultZodiac").innerHTML=
    data.zodiac;

    document.getElementById("resultDay").innerHTML=
    data.day;

    document.getElementById("prediction").innerHTML=
    result.Prediction;

    document.getElementById("luckyNumber").innerHTML=
    result.LuckyNumber;

    document.getElementById("luckyColor").innerHTML=
    result.LuckyColor;

    document.getElementById("luckyDirection").innerHTML=
    result.LuckyDirection;

    document.getElementById("luckyTime").innerHTML=
    result.LuckyTime;

    document.getElementById("mantra").innerHTML=
    result.Mantra;

    document.getElementById("god").innerHTML=
    result.God;

    /* -------------------------
       Action Image
    --------------------------*/

    document.getElementById("actionImage").src=
    "images/action/"+result.Action;

    /* -------------------------
       Pariharam Image
    --------------------------*/

    document.getElementById("pariharamImage").src=
    "images/pariharam/"+result.Pariharam;

    /* -------------------------
       Result Panel
    --------------------------*/

    document.getElementById("resultPanel").style.display="block";

        }
/* ==========================================================
   AYMP Cosmic Kingdom
   Daily Zodiac Engine
   Part 4
==========================================================*/

/* -------------------------
   Loading
--------------------------*/

function showLoading(){

    document.getElementById("loading").style.display="block";

}

function hideLoading(){

    document.getElementById("loading").style.display="none";

}

/* -------------------------
   Reset Screen
--------------------------*/

function resetPrediction(){

    document.getElementById("resultPanel").style.display="none";

    document.getElementById("prediction").innerHTML="";

    document.getElementById("luckyNumber").innerHTML="";

    document.getElementById("luckyColor").innerHTML="";

    document.getElementById("luckyDirection").innerHTML="";

    document.getElementById("luckyTime").innerHTML="";

    document.getElementById("mantra").innerHTML="";

    document.getElementById("god").innerHTML="";

    document.getElementById("actionImage").src="";

    document.getElementById("pariharamImage").src="";

}

/* -------------------------
   Validate DOB
--------------------------*/

function validateDOB(date){

    const today=new Date();

    if(date>today){

        alert("Future Date is not allowed.");

        return false;

    }

    return true;

}

/* -------------------------
   Image Error
--------------------------*/

function imageNotFound(img){

    img.src="images/default.png";

}

/* -------------------------
   Safe Search
--------------------------*/

async function startPrediction(){

    resetPrediction();

    showLoading();

    try{

        searchPrediction();

    }

    catch(error){

        console.error(error);

        alert("Unexpected Error");

    }

    hideLoading();

}
/* ==========================================================
   AYMP Cosmic Kingdom
   Daily Zodiac Engine
   Part 5 (Final)
==========================================================*/

/* -------------------------
   Engine Initialize
--------------------------*/

async function initializeEngine(){

    console.log("================================");

    console.log("AYMP Cosmic Zodiac Engine");

    console.log("Loading Database...");

    console.log("================================");

    await loadZodiacDatabase();

    console.log("Database Ready");

}

/* -------------------------
   Enter Key Support
--------------------------*/

document.addEventListener("keydown",function(event){

    if(event.key==="Enter"){

        startPrediction();

    }

});

/* -------------------------
   Window Load
--------------------------*/

window.onload=async()=>{

    await initializeEngine();

    document.getElementById("resultPanel").style.display="none";

    console.log("================================");

    console.log("AYMP Zodiac Ready");

    console.log("Powered By AYMP");

    console.log("================================");

};

/* -------------------------
   Utility
--------------------------*/

function version(){

    return "AYMP Zodiac Engine v1.0";

}

console.log(version());

/* -------------------------
   Developer Info
--------------------------*/

console.log("Developed For AYMP Cosmic Kingdom");

console.log("Powered By AYMP");   
