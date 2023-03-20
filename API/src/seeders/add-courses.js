const mongoose = require('mongoose');
const { Course, Question, CourseSection, Video } = require('../models/course.models');

async function connectDB(uri) {
    await mongoose.connect(uri)
}


// Random course titles
const titles = [
    'Introduction to JavaScript',
    'JavaScript: Understanding the Weird Parts',
    'Learn and Understand NodeJS',
    'Learn and Understand AngularJS',
    'Learn and Understand ReactJS',
    'Learn and Understand VueJS',
    'Learn and Understand MongoDB',
    'Learn and Understand ExpressJS',
    'Introduction to open science',
    'Introduction to open data',
    'Introduction to open hardware',
    'Introduction to open software'
];

// Random course 30 questions
const questions = [
    {
        question: "What is the output of the following code? var a = 10; var b = 20; var c = a + b; console.log(c);",
        correct_option: "30",
        options: ["10", "20", "30", "40"],
    },
    {
        question: "How do you create a function in JavaScript?",
        correct_option: "function myFunction()",
        options: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
    },
    {
        question: "What is the output of the following code? var x = 5; var y = 3; var z = x * y; console.log(z);",
        correct_option: "15",
        options: ["2", "3", "5", "15"],
    },
    {
        question: "How do you declare a variable in JavaScript?",
        correct_option: "all of the above",
        options: ["var", "let", "const", "all of the above"],
    },
    {
        question: "What is the difference between \"var\" and \"let\" in JavaScript?",
        correct_option: "Variables declared with \"let\" are block-scoped, while variables declared with \"var\" are function-scoped",
        options: ["There is no difference", "Variables declared with \"var\" are block-scoped, while variables declared with \"let\" are function-scoped", "Variables declared with \"let\" are block-scoped, while variables declared with \"var\" are function-scoped", "Variables declared with \"let\" are not hoisted, while variables declared with \"var\" are hoisted"],
    },
    {
        question: "How do you check if a variable is an array in JavaScript?",
        correct_option: "Array.isArray()",
        options: ["typeof", "Array.isArray()", "instanceof", "all of the above"],
    },
    {
        question: "What is the output of the following code? var arr = [1, 2, 3]; console.log(arr.length);",
        correct_option: "3",
        options: ["0", "1", "2", "3"],
    },
    {
        question: "What is the difference between null and undefined in JavaScript?",
        correct_option: "null is an assigned value, while undefined means a variable has been declared but has not yet been assigned a value",
        options: ["null is an assigned value, while undefined is not assigned", "undefined is an assigned value, while null is not assigned", "null is an object, while undefined is a primitive value", "null is a primitive value, while undefined is an object"],
    },
    {
        question: "What is a closure in JavaScript?",
        correct_option: "A closure is a function that has access to its outer function scope even after the outer function has returned",
        options: ["A closure is an object that holds primitive values", "A closure is a function that can only be called once", "A closure is a function that has access to its outer function scope only while the outer function is executing", "A closure is a function that has access to global variables"],
    },
    {
        question: "What is the difference between == and === in JavaScript?",
        correct_option: "== compares values, while === compares values and types",
        options: ["== compares values and types, while === compares values", "== and === are interchangeable", "== and === are deprecated", "== and === are not used in JavaScript"],
    },
]

async function pickRandomQuestionsAndUpdateDB() {
    const questions_in_db = await Question.find()

    questions_in_db.forEach(async (question) => {
        const random_question = questions[Math.floor(Math.random() * questions.length)];
        question.question = random_question.question;
        question.correct_option = random_question.correct_option;
        question.options = random_question.options;
        await question.save();
    })
}

const videos = [
    {
        title: 'Introduction to JavaScript',
        author: 'John Doe',
        video_url: 'https://www.youtube.com/embed/UKIaRoUcL6g',
        description: 'This is a video about JavaScript',
        duration: '20:00',
        category: 'JavaScript'
    },
    {
        title: 'Python for Beginners',
        author: 'Jane Smith',
        video_url: 'https://www.youtube.com/embed/g4iDgAkLIRs',
        description: 'This is a video about Python programming for beginners',
        duration: '30:00',
        category: 'Python'
    },
    {
        title: 'React vs Angular',
        author: 'Bob Johnson',
        video_url: 'https://www.youtube.com/embed/YJ4nVGvPZaI',
        description: 'This video compares React and Angular frameworks',
        duration: '15:00',
        category: 'Frontend'
    },
    {
        title: 'Introduction to AWS',
        author: 'Alice Lee',
        video_url: 'https://www.youtube.com/embed/x7-Sd-8mty8',
        description: 'This is a video about Amazon Web Services',
        duration: '25:00',
        category: 'Cloud Computing'
    },
    {
        title: 'How to Build a Chatbot',
        author: 'David Wang',
        video_url: 'https://www.youtube.com/embed/R9OHn5ZF4Uo',
        description: 'This video teaches you how to build a chatbot using Python',
        duration: '40:00',
        category: 'Artificial Intelligence'
    },
    {
        title: 'Creating Responsive Websites',
        author: 'Sarah Kim',
        video_url: 'https://www.youtube.com/embed/cu7vNvqKQZM',
        description: 'This video shows you how to create responsive websites using CSS',
        duration: '30:00',
        category: 'Web Development'
    },
    {
        title: 'Node.js Tutorial',
        author: 'Mike Chen',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'This video teaches you how to use Node.js for backend development',
        duration: '45:00',
        category: 'Node.js'
    },
    {
        title: 'Data Science for Beginners',
        author: 'Emily Wong',
        video_url: 'https://www.youtube.com/embed/gsTQI7Xv_yE',
        description: 'This is a video about data science for beginners',
        duration: '35:00',
        category: 'Data Science'
    },
    {
        title: 'Building RESTful APIs',
        author: 'Jack Lee',
        video_url: 'https://www.youtube.com/embed/KJhVhI1B4n4',
        description: 'This video teaches you how to build RESTful APIs using Node.js and Express',
        duration: '50:00',
        category: 'API Development'
    },
    {
        title: 'Machine Learning Algorithms',
        author: 'Daniel Kim',
        video_url: 'https://www.youtube.com/embed/jmD0VTx5xQg',
        description: 'This video covers different machine learning algorithms',
        duration: '40:00',
        category: 'Machine Learning'
    },
]

async function pickRandomVideosAndUpdateDB () {
    const videos_in_db = await Video.find()

    videos_in_db.forEach(async (video) => {
        console.log(video)
        const random_video = videos[Math.floor(Math.random() * videos.length)];
        await video.update({
            title: random_video.title,
            author: random_video.author,
            video_url: random_video.video_url,
            description: random_video.description,
            duration: random_video.duration,
            category: random_video.category
        });
    })
}

const course_section_titles = [
    'Introduction',
    'Getting Started',
    'Basics',
    'Advanced',
    'Conclusion'
]

async function pickRandomCourseSectionTitlesAndUpdateDB () {
    const course_sections_in_db = await CourseSection.find()

    course_sections_in_db.forEach(async (course_section) => {
        const random_course_section_title = course_section_titles[Math.floor(Math.random() * course_section_titles.length)];
        await course_section.updateOne({title: random_course_section_title});
    })
}

const preview_images = [
    "https://res.cloudinary.com/dipyrsqvy/image/upload/v1679256528/courses/preview_images/cloud_bnxpfd.png",
    "https://res.cloudinary.com/dipyrsqvy/image/upload/v1679256526/courses/preview_images/cloud2_dsfdkz.png",
    "https://res.cloudinary.com/dipyrsqvy/image/upload/v1679256523/courses/preview_images/cloud1_wor492.png",
    "https://res.cloudinary.com/dipyrsqvy/image/upload/v1679256522/courses/preview_images/cloud_reguhe.jpg",
]

const courses = [
    {
        title: 'JavaScript for Beginners',
        description: 'This course teaches you the basics of JavaScript',
        author: 'John Doe',
        preview_image: preview_images[0],
    },
    {
        title: 'Python for Beginners',
        description: 'This course teaches you the basics of Python',
        author: 'Jane Smith',
        preview_image: preview_images[1],
    },
    {
        title: 'React vs Angular',
        description: 'This course compares React and Angular frameworks',
        author: 'Bob Johnson',
        preview_image: preview_images[2],
    },
    {
        title: 'Introduction to AWS',
        description: 'This course teaches you about Amazon Web Services',
        author: 'Alice Lee',
        preview_image: preview_images[3],
    },
    {
        title: 'How to Build a Chatbot',
        description: 'This course teaches you how to build a chatbot using Python',
        author: 'David Wang',
        preview_image: preview_images[0],
    },
]

async function pickRandomCourseAndUpdateDB () {
    const courses_in_db = await Course.find()

    courses_in_db.forEach(async (course) => {
        console.log(course)
        const random_course = courses[Math.floor(Math.random() * courses.length)];
        course.title = random_course.title;
        course.description = random_course.description;
        course.author = random_course.author;
        course.preview_image = random_course.preview_image;

        await course.update();
    })
}


const seedDB = async (uri) => {
    await connectDB(uri);

    console.log('updating questions');
    await pickRandomQuestionsAndUpdateDB();

    console.log('updating videos');
    await pickRandomVideosAndUpdateDB();

    console.log('updating course sections');
    await pickRandomCourseSectionTitlesAndUpdateDB();

    console.log('updating courses');
    await pickRandomCourseAndUpdateDB();

    console.log('Database seeded!');
    process.exit();
}

const MongoUri = "mongodb+srv://moocs:Richi3-boayant-rorwak-bydmEg-7wemfe@boayant.haz1j1c.mongodb.net/moocs_dev?retryWrites=true&w=majority"

seedDB(MongoUri);