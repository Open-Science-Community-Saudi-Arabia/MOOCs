const {
    CROWDIN_API_KEY,
    CROWDIN_API,
    CROWDIN_MTS_ID,
} = require('./config');
const axios = require('axios');
// // Example API route
// app.get('/api/course/:id', async (req, res) => {
//     const courseId = req.params.id;
//     const courseData = await fetchCourseData(courseId);
//     const translatedCourseData = await translateCourseData(courseData, TARGET_LANG);

//     res.json(translatedCourseData);
// });

// // Fetch course data from MongoDB
// async function fetchCourseData(courseId) {
//     // Your MongoDB code here
// }

// // Translate course data using CROWDIN API
// async function translateCourseData(courseData, targetLang) {
//     const response = await axios.post(
//         `${CROWDIN_API_ENDPOINT}/translations`,
//         {
//             projectId: 'YOUR_PROJECT_ID', // Replace with your CROWDIN project ID
//             languageId: targetLang,
//             files: [
//                 {
//                     name: 'course_data.json', // Replace with your file name
//                     content: JSON.stringify(courseData),
//                 },
//             ],
//             autoApproveOption: '1',
//         },
//         {
//             headers: {
//                 'Authorization': `Bearer ${CROWDIN_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         }
//     );

//     return JSON.parse(response.data.translations[0].data);
// }

const auth = {
    headers: {
        authorization: 'Bearer ' + CROWDIN_API_KEY,
        'Content-Type': 'application/json',
        'Crowdin-API-FileName': 'MOOCS API',
    },
}

async function translateResponse(doc_to_translate) {
    try {
        let data = doc_to_translate.toObject()
        /**
         * An object that contains the keys of the strings 
         * to translate and their index in the strings_to_translate array
         * */
        const keys = {}
        const strings_to_translate = []

        // The keys that we want to translate
        const dictionary = {
            'title': 'title',
            'description': 'description',
        }

        // Get the keys of the strings to translate
        let count = 0
        for (const key in data) {
            if (dictionary[key]) {
                // Add the key and its index in the strings_to_translate array
                keys[key] = count
                count++
                strings_to_translate.push(data[key])
            }
        }

        const res = await axios.post(`${CROWDIN_API}/mts/${CROWDIN_MTS_ID}/translations`, {
            "languageRecognitionProvider": "crowdin",
            "targetLanguageId": "ar",
            "sourceLanguageId": "en",
            "strings": strings_to_translate,
        }, auth)

        // Replace the strings with their translations
        const translated_strings = res.data.data.translations
        for (const key in keys) {
            data[key] = translated_strings[keys[key]]
        }

        return data
    } catch (error) {
        return error
    }
}

module.exports = {
    translateResponse
}
