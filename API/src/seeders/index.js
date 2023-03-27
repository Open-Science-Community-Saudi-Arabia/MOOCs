const {
    videos,
    exercises,
    text_materials,
    course_sections,
    course, questions
} = require('./settings');

const mongoose = require('mongoose');
const { Course, CourseSection, Question,
    Video, Exercise, TextMaterial } = require('../models/course.models');

async function connectToDatabase() {
    try {
        const MONGO_URL = require('./config.js').MONGO_URL;
        await mongoose.connect(MONGO_URL);

        console.log("Connected to database");
    } catch (error) {
        return error;
    }
}

async function seed() {
    try {
        const connection_result = await connectToDatabase();
        if (connection_result instanceof Error) {
            throw connection_result;
        }

        // Convert preview image path to absolute path
    
        course.preview_image = 'https://res.cloudinary.com/dipyrsqvy/image/upload/v1679875257/courses/preview_images/course_preview_6420dcd1283f2c65f97b674c.jpg'
        // Create course    // course.preview_image = __dirname + course.preview_image;
        const new_course = await Course.create(course);

        console.log(__dirname)

        // Create course sections
        for (let i = 0; i < course_sections.length; i++) {
            const new_course_section = await CourseSection.create({
                ...course_sections[i],
                course: new_course._id,
            });

            // Create videos if they belong to the course section
            for (let j = 0; j < videos.length; j++) {
                if (videos[j].course_section === i) {
                    await Video.create({
                        ...videos[j],
                        course_section: new_course_section._id,
                        course: new_course._id,
                    });
                }
            }


            // Create exercises if they belong to the course section
            for (let j = 0; j < exercises.length; j++) {
                let new_exercise;
                if (exercises[j].course_section === i) {
                    new_exercise = await Exercise.create({
                        ...exercises[j],
                        course_section: new_course_section._id,
                        course: new_course._id,
                    });

                    // Create questions if they belong to the exercise
                    for (let k = 0; k < questions.length; k++) {
                        if (questions[k].exercise === j) {
                            await Question.create({
                                ...questions[k],
                                exercise: new_exercise._id,
                                course: new_course._id,
                            });
                        }
                    }
                }

            }

            // Create text materials if they belong to the course section
            const file_url = 'https://res.cloudinary.com/dipyrsqvy/image/upload/v1679254945/course_6411dbb7d07a77d6c06a44f3/coursesection_6411dc27d07a77d6c06a454a/textmaterial_641765bcf7e6c01b997c0b42_resume%20test.pdf.pdf'
            for (let j = 0; j < text_materials.length; j++) {
                if (text_materials[j].course_section === i) {
                    await TextMaterial.create({
                        ...text_materials[j],
                        course_section: new_course_section._id,
                        course: new_course._id,
                        // file_url: __dirname + text_materials[j].file_ur
                        file_url: file_url
                    });
                }
            }
        }

        const course_main = await Course.find()
        console.log(course_main[0].toObject())
        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.log(error);
        // exit process
        process.exit(1);
    }
}

seed();