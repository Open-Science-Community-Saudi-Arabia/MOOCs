const {
    CROWDIN_API_KEY,
    CROWDIN_API,
    CROWDIN_MTS_ID,
} = require('./config');
const axios = require('axios');


async function translateText(text, targetLanguage) {
    console.log(text)
    try {
        const response = await axios.post(
            `https://api.crowdin.com/api/v2/mts/280206/translations`,
            {
                strings: [text],
                targetLanguageId: targetLanguage
            },
            {
                headers: {
                    'Authorization': `Bearer ${CROWDIN_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.data.translations
    } catch (error) {
        // console.error('Error translating text:', error);
        return null;
    }
}

// Example usage:
async function processApiResponse(apiResponse, targetLanguage) {
    const translatedResponse = {};
    for (const [key, value] of Object.entries(apiResponse)) {
        translatedResponse[key] = await translateText(value, targetLanguage);
    }
    return translatedResponse;
}



module.exports = {

    processApiResponse
}