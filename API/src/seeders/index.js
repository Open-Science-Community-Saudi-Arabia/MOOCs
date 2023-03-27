const {
    videos,
    exercises,
    text_materials,
    course_sections,
    course,
} = require('./settings');

const mongoose = require('mongoose');
const { Course, CourseSection,
    Video, Exercise, TextMaterial } = require('../models/course.models');

async function connectToDatabase() {
    try {
        const MONGO_URL = require('../config.js').MONGO_URL;
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

        // Create course
        const new_course = await Course.create(course);

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
                if (exercises[j].course_section === i) {
                    await Exercise.create({
                        ...exercises[j],
                        course_section: new_course_section._id,
                        course: new_course._id,
                    });
                }
            }

            // Create text materials if they belong to the course section
            for (let j = 0; j < text_materials.length; j++) {
                if (text_materials[j].course_section === i) {
                    await TextMaterial.create({
                        ...text_materials[j],
                        course_section: new_course_section._id,
                        course: new_course._id,
                    });
                }
            }
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.log(error);
        // exit process
        process.exit(1);
    }
}

seed();