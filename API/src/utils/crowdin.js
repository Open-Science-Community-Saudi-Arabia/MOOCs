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

async function translateArray(str_arr) {
    try {
        const res = await axios.post(`${CROWDIN_API}/mts/${CROWDIN_MTS_ID}/translations`, {
            "languageRecognitionProvider": "crowdin",
            "targetLanguageId": "ar",
            "sourceLanguageId": "en",
            "strings": str_arr,
        }, auth)

        // Replace the strings with their translations
        const translated_strings = res.data.data.translations

        console.log(translated_strings)

        return translated_strings

    } catch (error) {
        console.log(error)
        return error
    }
}

async function translateDoc(doc_to_translate) {
    try {
        let data = doc_to_translate

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
            'question': 'question',
            'correct_option': 'correct_option',
        }

        // Get the keys of the strings to translate
        let count = 0
        for (const key in data.toObject()) {
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
            data[key.toString() + '_tr'] = translated_strings[keys[key]]
        }

        if (data.type === "question") {
            data.options_tr = await translateArray(data.options)
            data.correct_option_tr = (await translateArray([data.correct_option]))[0]
        }

        return data
    } catch (error) {
        console.log(error)
        // console.log(error.response.data.errors[0].error)
        return error
    }
}

async function translateCourse(course) {
    const translated_course = await translateDoc(course)

    // Translate the course sections
    const course_sections = translated_course.course_sections
    for (let i = 0; i < course_sections.length; i++) {
        const section = course_sections[i]
        const translated_section = await translateDoc(section)

        // Translate the section videos
        const section_videos = translated_section.videos
        for (let j = 0; j < section_videos.length; j++) {
            await translateDoc(section_videos[j]);
        }

        // Translate the section exercises
        const exercises = translated_section.exercises
        for (let j = 0; j < exercises.length; j++) {
            const exercise = exercises[j]

            // Translate the exercise questions
            const questions = exercise.questions
            for (let k = 0; k < questions.length; k++) {
                questions[k].options = await translateArray(questions[k].options);
                await translateDoc(questions[k]);
            }
        }
    }

    return translated_course
}

module.exports = {
    translateDoc,
    translateCourse,
    translateArray
}
