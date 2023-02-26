const authRoute = require('./auth.routes')
const courseRoute = require("./course.routes")
const exerciseRoute = require("./exercise.routes")
const questionRoute = require("./question.routes")

// Route path format should start with /api/v1/
module.exports = function (app) {
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/course', courseRoute)
    app.use('/api/v1/exercise', exerciseRoute)
    app.use('/api/v1/question', questionRoute)
    // app.use('/api/v1/course', courseRoute)
}