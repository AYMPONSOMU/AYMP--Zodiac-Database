// ==========================================
// AYMP Astro Engine V2.1
// Compatible with:
// {
//   "Aries": { "Day1": {...} }
// }
// ==========================================

function getZodiac(day, month){

if((month==3 && day>=21)||(month==4 && day<=19)) return "aries";
if((month==4 && day>=20)||(month==5 && day<=20)) return "taurus";
if((month==5 && day>=21)||(month==6 && day<=20)) return "gemini";
if((month==6 && day>=21)||(month==7 && day<=22)) return "cancer";
if((month==7 && day>=23)||(month==8 && day<=22)) return "leo";
if((month==8 && day>=23)||(month==9 && day<=22)) return "virgo";
if((month==9 && day>=23)||(month==10 && day<=22)) return "libra";
if((month==10 && day>=23)||(month==11 && day<=21)) return "scorpio";
if((month==11 && day>=22)||(month==12 && day<=21)) return "sagittarius";
if((month==12 && day>=22)||(month==1 && day<=19)) return "capricorn";
if((month==1 && day>=20)||(month==2 && day<=18)) return "aquarius";
if((month==2 && day>=19)||(month==3 && day<=20)) return "pisces";

return "";
}

async function findPrediction(){

let username=document.getElementById("username").value.trim();
let dob=document.getElementById("dob").value.trim();

if(dob.length!=8){

document.getElementById("result").innerHTML=
"❌ DOB Format : DDMMYYYY";

return;

}

let day=parseInt(dob.substring(0,2));
let month=parseInt(dob.substring(2,4));

let zodiac=getZodiac(day,month);

if(zodiac==""){

document.getElementById("result").innerHTML=
"❌ Invalid Date";

return;

}

// JSON File URL
const jsonURL=
"https://raw.githubusercontent.com/AYMPONSOMU/AYMP--Zodiac-Database/main/"+zodiac+"_v1.json";

// JSON Key உருவாக்குதல்
const zodiacKey=
zodiac.charAt(0).toUpperCase()+zodiac.slice(1);

// பெயர்
let name = document.getElementById("username").value.trim();

// பெயரின் எழுத்து மதிப்பு
let total = 0;

for(let i=0;i<name.length;i++){
    total += name.charCodeAt(i);
}

// பிறந்த தேதி சேர்க்க
total += day;
total += month;
total += parseInt(dob.substring(4,8));

// இன்றைய தேதி
let now = new Date();

total += now.getDate();
total += now.getMonth()+1;
total += now.getFullYear();

// Day1 - Day50
let dayNumber = (total % 50) + 1;

let dayKey = "Day" + dayNumber;

document.getElementById("result").innerHTML=
"Loading AYMP Astro Engine...";

try{

const response=await fetch(jsonURL);

if(!response.ok){

throw new Error("JSON File Not Found");

}

const data=await response.json();

if(!data[zodiacKey]){

throw new Error("Zodiac Data Missing");

}

const info=data[zodiacKey][dayKey];

if(!info){

throw new Error(dayKey+" Missing");

}

document.getElementById("result").innerHTML=

"<h2>Welcome "+username+"</h2>"+

"<hr>"+

"<b>Zodiac :</b> "+zodiacKey+

"<br><br>"+

"<b>Today's Prediction</b><br>"+

info.Prediction+

"<br><br>"+

"<b>Lucky Number :</b> "+info.LuckyNumber+

"<br><br>"+

"<b>Action :</b> "+info.Action+

"<br><br>"+

"<b>Pariharam :</b> "+info.Pariharam+

"<hr>"+

"Powered by AYMP Astro Engine";

}

catch(error){

document.getElementById("result").innerHTML=

"❌ "+error.message;

console.log(error);

}

  }
