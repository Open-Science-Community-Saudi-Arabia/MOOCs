const crowdinAPI = require('crowdin-api');
const { CROWDIN_PROJECT_ID, CROWDIN_API_KEY } = require('./config');
const CROWDIN_API_ENDPOINT = 'https://api.crowdin.com/api/v2'
const crowdin = new crowdinAPI({
    apiKey: CROWDIN_API_KEY,
    projectName: 'openinnovationlab',
})
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
async function translateResponse(response) {
    try {
        const text_to_translate = JSON.stringify(response)

        const translated_response = await axios.post(
            `${CROWDIN_API_ENDPOINT}/translations`,
            {
                projectId: CROWDIN_PROJECT_ID, // Replace with your CROWDIN project ID
                languageId: 'ar',
                files: [
                    {
                        name: 'course_data.json', // Replace with your file name
                        content: JSON.stringify(text_to_translate),
                    },
                ],
                autoApproveOption: '1',
            },
            {
                headers: {
                    'Authorization': `Bearer ${CROWDIN_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log(translated_response.data)
        return translated_response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    translateResponse
}
