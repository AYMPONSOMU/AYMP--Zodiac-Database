// ==============================
// AYMP Astro Engine V2
// ==============================

// Zodiac கண்டுபிடித்தல்
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

// ===============================

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

// ஒவ்வொரு ராசிக்கும் தனி JSON
const jsonURL=

"https://raw.githubusercontent.com/AYMPONSOMU/AYMP--Zodiac-Database/main/"+zodiac+"_v1.json";

let today=new Date().getDate();

let dayNumber=((today-1)%50)+1;

let dayKey="Day"+dayNumber;

document.getElementById("result").innerHTML=
"Loading AYMP Astro Engine...";

try{

const response=await fetch(jsonURL);

const data=await response.json();

const info=data[dayKey];

document.getElementById("result").innerHTML=

"<h2>"+username+"</h2>"+

"<br><b>"+zodiac.toUpperCase()+"</b>"+

"<hr>"+

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

"❌ Database Error<br><br>"+error;

}

}
