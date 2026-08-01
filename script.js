// GitHub Raw JSON URL
const jsonURL =
"https://raw.githubusercontent.com/AYMPONSOMU/AYMP--Zodiac-Database/refs/heads/main/allzodiac_v1.json";

async function findPrediction(){

let dob=document.getElementById("dob").value;

if(dob.length!=8){

document.getElementById("result").innerHTML="Enter DOB as DDMMYYYY";

return;

}

let day=parseInt(dob.substring(0,2));

let month=parseInt(dob.substring(2,4));

let zodiac="";

if((month==3&&day>=21)||(month==4&&day<=19))
zodiac="aries";

else if((month==4&&day>=20)||(month==5&&day<=20))
zodiac="taurus";

else{

document.getElementById("result").innerHTML="Zodiac not added yet.";

return;

}

// இன்று தேதியை எடு
let today=new Date().getDate();

// 1 முதல் 50 வரை மட்டும்
let dayKey="Day"+(((today-1)%50)+1);

try{

const response=await fetch(jsonURL);

const data=await response.json();

const info=data.Zodiacs[zodiac][dayKey];

document.getElementById("result").innerHTML=

"<h2>"+zodiac.toUpperCase()+"</h2>"+

"<b>Today's Prediction</b><br>"+

info.Prediction+

"<br><br><b>Lucky Number :</b> "+

info.LuckyNumber+

"<br><br><b>Action :</b> "+

info.Action+

"<br><br><b>Pariharam :</b> "+

info.Pariharam;

}
catch(e){

document.getElementById("result").innerHTML="Database Error";

}

  }
