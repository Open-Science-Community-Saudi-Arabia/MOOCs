const crowdinAPI = require('crowdin-api');
const { CROWDIN_PROJECT_ID, CROWDIN_API_KEY } = require('./config');

const crowdin = new crowdinAPI({
    apiKey: CROWDIN_API_KEY,
    projectName: 'openinnovationlab',
})

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

        const translated_text = await crowdin.translate({
            projectId: CROWDIN_PROJECT_ID,
            text: text_to_translate,
            languageId: 'ar',
        })

        const translated_response = JSON.parse(translated_text)

        return translated_response
    } catch (error) {
        return error
    }
}

module.exports = {
    translateResponse
}
