// ======================================
// AYMP Astro Engine V3.0
// Powered by AYMP
// ======================================

// Name Hash
function hashName(name){

let hash = 7;

for(let i=0;i<name.length;i++){

hash = (hash * 31 + name.charCodeAt(i)) % 1000003;

}

return hash;

}

// Zodiac Finder
function getZodiac(day,month){

if((month==3&&day>=21)||(month==4&&day<=19)) return "aries";
if((month==4&&day>=20)||(month==5&&day<=20)) return "taurus";
if((month==5&&day>=21)||(month==6&&day<=20)) return "gemini";
if((month==6&&day>=21)||(month==7&&day<=22)) return "cancer";
if((month==7&&day>=23)||(month==8&&day<=22)) return "leo";
if((month==8&&day>=23)||(month==9&&day<=22)) return "virgo";
if((month==9&&day>=23)||(month==10&&day<=22)) return "libra";
if((month==10&&day>=23)||(month==11&&day<=21)) return "scorpio";
if((month==11&&day>=22)||(month==12&&day<=21)) return "sagittarius";
if((month==12&&day>=22)||(month==1&&day<=19)) return "capricorn";
if((month==1&&day>=20)||(month==2&&day<=18)) return "aquarius";
if((month==2&&day>=19)||(month==3&&day<=20)) return "pisces";

return "";

}

async function findPrediction(){

let username=document.getElementById("username").value.trim();

let dob=document.getElementById("dob").value.trim();

if(username==""){

document.getElementById("result").innerHTML="❌ Enter Your Name";

return;

}

if(dob.length!=8){

document.getElementById("result").innerHTML="❌ DOB Format : DDMMYYYY";

return;

}

let day=parseInt(dob.substring(0,2));

let month=parseInt(dob.substring(2,4));

let year=parseInt(dob.substring(4,8));

let zodiac=getZodiac(day,month);

if(zodiac==""){

document.getElementById("result").innerHTML="❌ Invalid Date";

return;

}

const zodiacKey=zodiac.charAt(0).toUpperCase()+zodiac.slice(1);

const jsonURL="https://raw.githubusercontent.com/AYMPONSOMU/AYMP--Zodiac-Database/main/"+zodiac+"_v1.json";

let today=new Date();

let total=
hashName(username)+
(day*37)+
(month*71)+
(year)+
(today.getDate()*13)+
((today.getMonth()+1)*17)+
(today.getFullYear());

let dayNumber=(Math.abs(total)%50)+1;

let dayKey="Day"+dayNumber;

document.getElementById("result").innerHTML="Loading AYMP Astro Engine...";

try{

const response=await fetch(jsonURL);

const data=await response.json();

if(
    !data ||
    !data[zodiacKey] ||
    !data[zodiacKey][dayKey]
){
    document.getElementById("result").innerHTML =
    "❌ "+zodiacKey+" JSON Missing ("+dayKey+")";
    return;
}

const info = data[zodiacKey][dayKey];

document.getElementById("result").innerHTML=

"<h2>Welcome "+username+"</h2>"+

"<hr>"+

"<b>Zodiac :</b> "+zodiacKey+

"<br><br>"+

"<b>Prediction :</b><br>"+info.Prediction+

"<br><br>"+

"<b>Lucky Number :</b> "+info.LuckyNumber+

"<br><br>"+

"<b>Action :</b> "+info.Action+

"<br><br>"+

"<b>Pariharam :</b> "+info.Pariharam+

"<br><br>"+

"<b>AYMP Day :</b> "+dayKey+

"<hr>"+

"Powered by AYMP Astro Engine";

}
catch(e){

document.getElementById("result").innerHTML="❌ "+e.message;

}

    }
