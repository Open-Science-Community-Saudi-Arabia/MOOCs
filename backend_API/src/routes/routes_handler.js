const authRoute = require('./auth.routes')

// Route path format should start with /api/vi/
module.exports = function (app) {
    app.use('/api/v1/auth', authRoute)
    // app.use('/api.v1/course', courseRoute)
    // app.use('/api/v1/course', courseRoute)
}