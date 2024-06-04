const axios = require("axios");
const { CROWDIN_API_KEY, CROWDIN_MTS_ID } = require("./config");

const auth = {
  headers: {
    authorization: "Bearer " + CROWDIN_API_KEY,
    "Content-Type": "application/json",
  },
};

async function translateDoc() {
  const str_arr = ["Hello, world!", "testing Crowdin", "testing question"];
  try {
    const url = `https://api.crowdin.com/api/v2/mts/${CROWDIN_MTS_ID}/translations`;
    const res = await axios.post(
      url,
      {
        languageRecognitionProvider: "crowdin",
        targetLanguageId: "ar",
        sourceLanguageId: "en",
        strings: str_arr,
      },
      auth
    );
    return res.data.data.translations;
  } catch (error) {
    console.error(
      "Translation error:",
      error.response.data.error || error.response.data.errors[0].error
    );
  }
}

module.exports = {
  translateDoc,
};
