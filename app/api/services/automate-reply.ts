import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const callGeminiAPI = async (tweet: string) => {
  const body = {
    contents: [{
      parts: [{
        text: tweet
      }]
    }]
  }
  const response = await axios.post(GEMINI_API, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data.candidates[0].content.parts[0].text;
}

export const automateRetweet = async (tweet: string) => {
  try {
    // get the retweet text from gpt
    const prompt = `Craft a thoughtful, engaging, and mature reply to the following tweet: "${tweet}".Ensure the reply is relevant, insightful, and adds value to the conversation. It should reflect empathy and professionalism, and avoid sounding too casual or superficial. Also it should be 300 characters or less.and it should not go against twitter Community Standards on spam.so you will have to try your best to humanize the reply. Provide the reply directly without any other text.`;

    return await callGeminiAPI(prompt);
  }
  catch (error) {
    console.log({ error });
    throw error;
  }
}