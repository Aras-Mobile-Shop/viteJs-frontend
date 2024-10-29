// src/utils/translationService.ts
import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
const TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2`;

export const translateText = async (text: string, targetLang: string) => {
  try {
    const response = await axios.post(
      TRANSLATE_URL,
      {},
      {
        params: {
          q: text,
          target: targetLang,
          key: API_KEY,
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text if translation fails
  }
};
