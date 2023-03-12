const authRoute = require('./auth.routes')
const courseRoute = require("./course.routes")
const courseSectionRoute = require('./coursesection.routes')
const exerciseRoute = require("./exercise.routes")
const questionRoute = require("./question.routes")
const textmaterialRoute = require("./textmaterial.routes")

// Route path format should start with /api/v1/
module.exports = function (app) {
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/course', courseRoute)
    app.use('/api/v1/coursesection', courseSectionRoute)
    app.use('/api/v1/exercise', exerciseRoute)
    app.use('/api/v1/question', questionRoute)
    app.use('/api/v1/textmaterial', textmaterialRoute)
    // app.use('/api/v1/course', courseRoute)
}