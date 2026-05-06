const  { GoogleGenAI } =  require('@google/genai');

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey: ""});

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: msg,

  });

  return response.text;
}

module.exports=main;



//FOR  SAVING CHATS HISTORY
// [
//       // Turn 1: User
//       {
//         role: "user",
//         parts: [{ text: "Hi Gemini, how are you?" }],
//       },

//       // Turn 2: Model
//       {
//         role: "model",
//         parts: [{ text: "I'm doing well! How can I help you today?" }],
//       },

//       // Turn 3: User (current input)
//       {
//         role: "user",
//         parts: [{ text: "What did I just ask you?" }],
//       },
//     ]      
 

