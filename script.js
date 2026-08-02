from pathlib import Path

js = r'''// AYMP Cosmic Zodiac - script.js
const JSON_URL="all_zodiac_v1.json";
let zodiacDatabase={};

async function loadZodiacDatabase(){
 const r=await fetch(JSON_URL);
 if(!r.ok) throw new Error("Cannot load JSON");
 zodiacDatabase=await r.json();
}

function getZodiac(d,m){
 if((m==3&&d>=21)||(m==4&&d<=19)) return "Aries";
 if((m==4&&d>=20)||(m==5&&d<=20)) return "Taurus";
 if((m==5&&d>=21)||(m==6&&d<=20)) return "Gemini";
 if((m==6&&d>=21)||(m==7&&d<=22)) return "Cancer";
 if((m==7&&d>=23)||(m==8&&d<=22)) return "Leo";
 if((m==8&&d>=23)||(m==9&&d<=22)) return "Virgo";
 if((m==9&&d>=23)||(m==10&&d<=22)) return "Libra";
 if((m==10&&d>=23)||(m==11&&d<=21)) return "Scorpio";
 if((m==11&&d>=22)||(m==12&&d<=21)) return "Sagittarius";
 if((m==12&&d>=22)||(m==1&&d<=19)) return "Capricorn";
 if((m==1&&d>=20)||(m==2&&d<=18)) return "Aquarius";
 return "Pisces";
}
function getPredictionDay(){return "Day"+(((new Date().getDate()-1)%50)+1);}

function startPrediction(){
 const name=document.getElementById("username").value.trim();
 const dob=document.getElementById("dob").value;
 if(!name){alert("Enter Name");return;}
 if(!dob){alert("Select DOB");return;}
 const b=new Date(dob);
 const z=getZodiac(b.getDate(),b.getMonth()+1);
 const day=getPredictionDay();
 const res=(zodiacDatabase[z]||{})[day];
 if(!res){alert("Prediction not found");return;}
 document.getElementById("resultPanel").style.display="block";
 document.getElementById("resultName").textContent=name;
 document.getElementById("resultZodiac").textContent=z;
 document.getElementById("resultDay").textContent=day;
 document.getElementById("prediction").textContent=res.Prediction||"";
 document.getElementById("luckyNumber").textContent=res.LuckyNumber||"";
 document.getElementById("luckyColor").textContent=res.LuckyColor||"";
 document.getElementById("luckyDirection").textContent=res.LuckyDirection||"";
 document.getElementById("luckyTime").textContent=res.LuckyTime||"";
 document.getElementById("mantra").textContent=res.Mantra||"";
 document.getElementById("god").textContent=res.God||"";
 document.getElementById("actionImage").src="images/action/"+(res.Action||"");
 document.getElementById("pariharamImage").src="images/pariharam/"+(res.Pariharam||"");
}

window.onload=async()=>{
 try{
  await loadZodiacDatabase();
  document.getElementById("resultPanel").style.display="none";
 }catch(e){
  alert(e.message);
  console.error(e);
 }
};
'''
path="/mnt/data/script.js"
Path(path).write_text(js,encoding="utf-8")
print(path)
