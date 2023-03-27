const course = {
    title: "Course title",
    description: "Course description",
    author: "Your name",
    preview_image: "/course_files/preview_images/preview_image.png",
}

const course_sections = [
    {
        title: "Section 1",
        description: "Section 1 description"
    },
    {
        title: "Section 2",
        description: "Section 1 description"
    },
    {
        title: "Section 2",
        description: "Section 1 description"
    },
]

const videos = [
    {
        title: 'Introduction to JavaScript',
        author: 'John Doe',
        video_url: 'https://www.youtube.com/embed/desowWgV3iU',
        description: 'This is a video about JavaScript',
        duration: '20:00',
        category: 'JavaScript'
    },
    {
        title: 'Python for Beginners',
        author: 'Jane Smith',
        video_url: 'https://www.youtube.com/embed/10u1_CzdmQs',
        description: 'This is a video about Python programming for beginners',
        duration: '30:00',
        category: 'Python'
    },
    {
        title: 'React vs Angular',
        author: 'Bob Johnson',
        video_url: 'https://www.youtube.com/embed/LybOHJfqffA',
        description: 'This video compares React and Angular frameworks',
        duration: '15:00',
        category: 'Frontend'
    },
    {
        title: 'Introduction to AWS',
        author: 'Alice Lee',
        video_url: 'https://www.youtube.com/embed/XulHUHQru2I',
        description: 'This is a video about Amazon Web Services',
        duration: '25:00',
        category: 'Cloud Computing'
    },
]

const exercises = [
    {
        title: "Exercise 1",
        description: "Exercise 1 description",
        course_section: 0,
        category: "Open data",
        duration: 1,
    },
    {
        title: "Exercise 2",
        description: "Exercise 2 description",
        course_section: 0,
        category: "Open data",
        duration: 1,
    }
]

const questions = [
    {
        question: "What is the output of the following code? var a = 10; var b = 20; var c = a + b; console.log(c);",
        correct_option: "30",
        options: ["10", "20", "30", "40"],
        exercise: 0,
    },
    {
        question: "How do you create a function in JavaScript?",
        correct_option: "function myFunction()",
        options: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
        exercise: 0,
    },
    {
        question: "What is the output of the following code? var x = 5; var y = 3; var z = x * y; console.log(z);",
        correct_option: "15",
        options: ["2", "3", "5", "15"],
        exercise: 1,
    },
    {
        question: "How do you declare a variable in JavaScript?",
        correct_option: "all of the above",
        options: ["var", "let", "const", "all of the above"],
        exercise: 1,
    }
]

const text_materials = [
    {
        title: "Text material 1",
        description: "Text material 1 description",
        course_section: 0,
        category: "Open data",
        file_path: "/course_files/textmaterials/README.md"
    },
    {
        title: "Text material 2",
        description: "Text material 2 description",
        course_section: 0,
        category: "Open data",
        file_url: "/course_files/textmaterials/README.md"
    }
]

module.exports = {
    videos, exercises,
    text_materials, course_sections,
    course, questions
}