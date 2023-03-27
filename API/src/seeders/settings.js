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
        title: "Video 1",
        description: "Video 1 description",
        video_url: "https://www.youtube.com/watch?v=1",
        author: "Your name",
        duration: '1',
        course_section: 0,
        category: "Open data",
    },
    {
        title: "Video 2",
        description: "Video 1 description",
        video_url: "https://www.youtube.com/watch?v=1",
        author: "Your name",
        duration: '1',
        course_section: 0,
        category: "Open data",
    }
]

const exercises = [
    {
        title: "Exercise 1",
        description: "Exercise 1 description",
        course_section: 0,
        category: "Open data",
    },
    {
        title: "Exercise 2",
        description: "Exercise 2 description",
        course_section: 0,
        category: "Open data",
    }
]

const text_materials = [
    {
        title: "Text material 1",
        description: "Text material 1 description",
        course_section: 0,
        category: "Open data",
    },
    {
        title: "Text material 2",
        description: "Text material 2 description",
        course_section: 0,
        category: "Open data",
    }
]

module.exports = {
    videos, exercises, text_materials, course_sections
}