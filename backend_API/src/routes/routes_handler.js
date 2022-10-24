const authRoute = require('./auth.routes')
const courseRoute = require("./course.routes")

// Route path format should start with /api/v1/
module.exports = function (app) {
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/course', courseRoute)
    // app.use('/api/v1/course', courseRoute)
}
