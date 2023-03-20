

module.exports = {
    ...require('./auth.controllers'),
    ...require('./course.controllers'),
    ...require('./exercise.controllers'),
    ...require('./courseReport.controllers'),
    ...require('./textmaterial.controllers')
}