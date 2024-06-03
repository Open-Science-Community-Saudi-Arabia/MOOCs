const axios = require("axios");
const { CROWDIN_API_KEY, CROWDIN_MTS_ID } = require("./config");

const crowdinApi = axios.create({
  baseURL: "https://api.crowdin.com/api/v2",
  headers: {
    Authorization: `Bearer ${CROWDIN_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// Function to translate text
async function translateText(text, targetLanguage) {
    // console.log(text, targetLanguage)
  try {
    const response = await crowdinApi.post(
      `/mts/${CROWDIN_MTS_ID}/translations`,
      {
        text,
        targetLanguage,
      }
    );
      console.log(response)
    return response.data.translation;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors.map(err => err.error.message).join(', ');
        console.error('Translation error:', errors);
        throw new Error(errors);
    } else {
        console.error('Unexpected error:', error.message);
        throw new Error('Translation failed due to an unexpected error');
    }

  }
}

module.exports = {
  translateText,
};
