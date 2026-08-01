const jsonURL =
"https://raw.githubusercontent.com/AYMPONSOMU/AYMP--Zodiac-Database/refs/heads/main/allzodiac_v1.json";

function getZodiac(day, month){

if((month==3 && day>=21) || (month==4 && day<=19))
return "aries";

if((month==4 && day>=20) || (month==5 && day<=20))
return "taurus";

if((month==5 && day>=21) || (month==6 && day<=20))
return "gemini";

if((month==6 && day>=21) || (month==7 && day<=22))
return "cancer";

if((month==7 && day>=23) || (month==8 && day<=22))
return "leo";

if((month==8 && day>=23) || (month==9 && day<=22))
return "virgo";

if((month==9 && day>=23) || (month==10 && day<=22))
return "libra";

if((month==10 && day>=23) || (month==11 && day<=21))
return "scorpio";

if((month==11 && day>=22) || (month==12 && day<=21))
return "sagittarius";

if((month==12 && day>=22) || (month==1 && day<=19))
return "capricorn";

if((month==1 && day>=20) || (month==2 && day<=18))
return "aquarius";

if((month==2 && day>=19) || (month==3 && day<=20))
return "pisces";

return "";
}

async function findPrediction(){

let dob=document.getElementById("dob").value;

if(dob.length!=8){
alert("DOB format : DDMMYYYY");
return;
}

let day=parseInt(dob.substring(0,2));
let month=parseInt(dob.substring(2,4));

let zodiac=getZodiac(day,month);

if(zodiac==""){
alert("Wrong DOB");
return;
}

// இன்று தேதியைப் பெறு
let today=new Date().getDate();

// Day1 முதல் Day50 வரை
let dayNumber=((today-1)%50)+1;

let dayKey="Day"+dayNumber;

const response=await fetch(jsonURL);

const data=await response.json();

const result=data.Zodiacs[zodiac][dayKey];

document.getElementById("result").innerHTML=

"<h2>"+zodiac.toUpperCase()+"</h2>"+

"<br>"+result.Prediction+

"<br><br>Lucky Number : "+result.LuckyNumber+

"<br><br>Action : "+result.Action+

"<br><br>Pariharam : "+result.Pariharam;

}
