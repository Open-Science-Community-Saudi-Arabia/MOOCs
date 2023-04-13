const crowdinAPI = require('crowdin-api');
const CROWDIN_API = 'https://api.crowdin.com/api/v2'
const CROWDIN_PROJECT_ID = '580127'
const CROWDIN_API_KEY = '7ab2599a42f3aa76170d1c8bb7c2464ba3f16143c77d5fa9abd5e0edf19eeecf5880aa49fc06c431'
const STORAGE_ID = 1845177783
const crowdin = new crowdinAPI({
    apiKey: CROWDIN_API_KEY,
    projectName: 'Open Science MOOCs',
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

const auth = {
    headers: {
        authorization: 'Bearer ' + CROWDIN_API_KEY,
        'Content-Type': 'application/json',
        'Crowdin-API-FileName': 'MOOCS API',
    },
}
async function translateResponse() {
    try {
        console.log(CROWDIN_API_KEY)
        console.log(CROWDIN_PROJECT_ID)

        // CREATE STORAGE
        // const storages = await axios.post('https://api.crowdin.com/api/v2/storages', {
        //     'Crowdin-API-FileName': 'MOOCSAPI.json',
        // }, auth)
        // console.log(storages.data.data[0])
        // console.log(storages.data)

        // ADD FILE
        // const res = await axios.post('https://api.crowdin.com/api/v2/projects/580127/files', 
        // {
        //     "storageId": 1845177783,
        //     "name": "course.json",
        //     "title": "Course data",
        //     "type": "json",
        // }, auth)


        // EDIT FILE
        // const res = await axios.patch('https://api.crowdin.com/api/v2/projects/580127/files/3', [
        //     { "op": "add", "path": "/title", "value": "this is the beginning" }
        // ], auth)

        // console.log(res.data)

        // ADD STRINGS FOR TRANSLATION
        // const res = await axios.post('https://api.crowdin.com/api/v2/projects/580127/strings', {
        //     text: 'This is a test string',
        //     identifier: 'This is a test string',
        //     fileId: 3,
        // }, auth)

        // console.log(res.data)

        // GET MACHINE TRANSLATION
        // const res = await axios.get('https://api.crowdin.com/api/v2/mts', auth)
        // console.log(res.data.data[0])

        //  Translate via MT
        const res = await axios.post('https://api.crowdin.com/api/v2/mts/372727/translations', {
            "languageRecognitionProvider": "crowdin",
            "targetLanguageId": "ar",
            "sourceLanguageId": "en",
            "strings": [
                "Hi my name is Richie",
                "I am a software engineer",
                "I love to code",
                "I love to code in JavaScript",
            ]
        }, auth)

        console.log(res.data)


        // const res = await axios.post(
        //     'https://api.crowdin.com/api/v2/projects/580127/files',
        //     {
        //         "name": "MOOCS API",
        //         "title": "MOOCS API",
        //         "exportPattern": "/localization/%locale%/%file_name%",
        //         "priority": "normal"
        //     },
        //     auth
        // ).then().catch()

        // console.log({
        //     ...res.data
        // })

        // console.log(res.data.data[0])
    } catch (error) {
        console.log(error.response.data)
        console.log(error.response.data.errors)
        console.log(error.response.data.errors[0].error)
        return error
    }
}

translateResponse()

module.exports = {
    translateResponse
}
