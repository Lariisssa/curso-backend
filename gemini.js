import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
const headers = {
  'Content-Type': 'application/json',
};

export function gemini_response(promptText) {
  const data = {
    "contents": [{
      "parts": [{
        "text": promptText
      }]
    }]
  };

  return axios.post(url, data, { headers: headers })
    .then(response => {
      return response.data.candidates[0].content.parts[0].text;
    })
    .catch(error => {
      console.error('Houve um erro!', error);
      return null;
    });
}
