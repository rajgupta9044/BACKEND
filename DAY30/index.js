const  {GoogleGenAI} = require ('@google/genai');
const readlineSync = require('readline-sync');

const ConversationHistory=[];

const ai = new GoogleGenAI({apiKey:""});


async function chatting(){

const question = readlineSync.question('How can I help you');

const prompt=`you are an AI agent,who will respond to me in JSON only.
            Analyse the user query and try to fetch city and date details from it.
           Date format should be (yyyy-month-date) if user ask for future weather.
           If user ask for today weather,mark date as 'today'.
           To fetch weather details i already made a function which can fetch the weather details for me.
           you have to give response in json format which i give to the function so fetch data.
           
          if you need weather use the below format to respond me:
           JSON format should look like below:
           {
           "weather_details_needed":true,
           "location":[{"city":"mumbai","date":"today"},{"city":"delhi","date":"2026-04-30"}]
           }

           Once you have the weather report details respond me in json only
           JSON format should look like below:
           {
           "weather_details_needed":False,
           "weather_report":"bHAI DELHI KA MAUSAM TO MAST HAI TO BTA ,18 DEGREE TEMPERATURE GHAR PE PAKODI BNAO"
           }

           user asked this question${question}

           Strictly follow JSON FORMAT ,repond only in JSON Format
           `
ConversationHistory.push(
  {
    role:'user',parts:[{text:prompt}]
  })

  let count =0;

  while (count<5){

  

  const response= await main();

  ConversationHistory.push({role:'model',parts:[{text:response}]})

  const data=JSON.parse(response);

  if(data.weather_details_needed==false){
    console.log(data.weather_report);
    break;
  }

  

  const weatherInformation=await getWeather(data.location);
  const weather_info=JSON.stringify(weatherInformation);

  ConversationHistory.push({role:'user',parts:[{text:weather_info}]})

  count++;

}


}

chatting();






//TOOLS WHO ACTUALLY FETCH THE DATA FROM WEATHER API
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: ConversationHistory,
  });
  return response.text;
}



//FUNCTION JO WEATHER LEKE AAYEGA

async function getWeather(locations){

    const weatherInfo=[];

    for(const location of locations){

        const {date,city}=location;

       if(date.toLowerCase() === "today"){
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7ecc24a396a8460ebf3164536252505&q=${city}`);
        const data= await response.json();
        weatherInfo.push(data);
        }

        else{
            const response =await fetch(`http://api.weatherapi.com/v1/future.json?key=7ecc24a396a8460ebf3164536252505&q=${city}&dt=${date}`);
            const data= await response.json() ;
            weatherInfo.push(data);
        }

        
}
return weatherInfo;
}


//LLM MODEL KE PASS API KA ACCESS NHI HAI TO YE 
//DIRECT ANS NHI DE SKTA

//WE READ THE USER QUES AND CONVERT TO JSON USING LLM

//LLM KO BOLUGA :DELHI KA MAUSAM BATA ,RETURN ME MUJHE ARRAY DE DENA

//[ {city:delhi ,date:today}, {city:mumbai  ,date:today}]

// FUNCTION GETWEATHER:- ACTUAL WEATHER LLAKE DE DEGA ARRAY SE

//LLM -CREATE A WEATHER REPORT FOR THE ACTUAL WEATHER 

//USER KO OUTPUT ME SHOW KRA DEGA
