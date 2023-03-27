const mongoose = require('mongoose');
const { Course, CourseSection, Question, Video, Exercise, TextMaterial } = require('../models/course.models');
const { videos, exercises, text_materials, course_sections, course, questions } = require('./settings');
const { MONGO_URL } = require('./config.js');

mongoose.set('strictQuery', false);

// Function to connect to the database
async function connectToDatabase() {
    try {
        console.log("Connecting to local database...");
        await mongoose.connect(MONGO_URL);
        console.log("Connected to local database successfully");
    } catch (error) {
        console.log("'[Error] - Error connecting to local database");
        return error;
    }
}

// Function to create a new course
async function createCourse() {
    // Convert preview image path to absolute path
    course.preview_image = 'https://res.cloudinary.com/dipyrsqvy/image/upload/v1679875257/courses/preview_images/course_preview_6420dcd1283f2c65f97b674c.jpg';

    const new_course = await Course.create(course);
    console.log('Course created successfully');
    return new_course;
}

// Function to create course sections for a given course
async function createCourseSections(new_course) {
    for (let i = 0; i < course_sections.length; i++) {
        console.log('creating new course section ' + i)
        
        const new_course_section = await CourseSection.create({
            ...course_sections[i],
            course: new_course._id,
        });

        await createVideos(new_course, new_course_section, i);
        await createExercises(new_course, new_course_section, i);
        await createTextMaterials(new_course, new_course_section, i);

        console.log('[OK] - course section ' + i + ' created successfully')
    }
}

// Function to create videos for a given course section
async function createVideos(new_course, new_course_section, course_section_index) {
    for (let j = 0; j < videos.length; j++) {
        if (videos[j].course_section === course_section_index) {
            console.log('creating new video ' + j + ' for course section ' + course_section_index + '')
            await Video.create({
                ...videos[j],
                course_section: new_course_section._id,
                course: new_course._id,
            });
            console.log('[OK] - video ' + j + ' created successfully')
        }
    }
}

// Function to create exercises for a given course section
async function createExercises(new_course, new_course_section, course_section_index) {
    for (let j = 0; j < exercises.length; j++) {
        let new_exercise;

        // Create exercise if it belongs to the current course section
        if (exercises[j].course_section === course_section_index) {
            console.log('creating new exercise ' + j + ' for course section ' + course_section_index + '')
            
            new_exercise = await Exercise.create({
                ...exercises[j],
                course_section: new_course_section._id,
                course: new_course._id,
            });

            await createQuestions(new_course, new_exercise, j);

            console.log('[OK] - exercise ' + j + ' created successfully')
        }
    }
}

// Function to create questions for a given exercise
async function createQuestions(new_course, new_exercise, exercise_index) {
    for (let k = 0; k < questions.length; k++) {
        console.log('creating new question ' + k + ' for exercise ' + exercise_index + '')
        if (questions[k].exercise === exercise_index) {
            await Question.create({
                ...questions[k],
                exercise: new_exercise._id,
                course: new_course._id,
            });
        }
        console.log('[OK] - question ' + k + ' created successfully')
    }
}

// This function creates text materials for each course section in the database
async function createTextMaterials(new_course, new_course_section, course_section_index) {
    for (let j = 0; j < text_materials.length; j++) {
        // Check if the text material is for the current course section being created
        if (text_materials[j].course_section === course_section_index) {
            // Set the file URL for the text material
            const file_url = "https://res.cloudinary.com/dipyrsqvy/image/upload/v1679254945/course_6411dbb7d07a77d6c06a44f3/coursesection_6411dc27d07a77d6c06a454a/textmaterial_641765bcf7e6c01b997c0b42_resume%20test.pdf.pdf"

            console.log('creating new text material ' + j + ' for course section ' + course_section_index + '')

            // Create the text material in the database
            await TextMaterial.create({
                ...text_materials[j],
                course_section: new_course_section._id,
                course: new_course._id,
                file_url
            });

            console.log('[OK] - text material ' + j + ' created successfully')
        }
    }
}

// This function seeds the database with courses, course sections, and text materials
async function seedDatabase() {
    try {
        // Connect to the database
        await connectToDatabase();
        // Create a new course in the database
        const new_course = await createCourse();
        // Create course sections for the new course
        await createCourseSections(new_course);
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
}

seedDatabase();

// Handle any unhandled promise rejections by logging them
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});