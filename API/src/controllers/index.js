/**
 * API Documentation
 *
 * @module Controllers
 * @member Auth
 * @description This module contains the controllers for the backend API.
 * 
 * */


module.exports = {
    ...require('./auth.controllers'),
    ...require('./course.controllers'),
    ...require('./exercise.controllers'),
    ...require('./courseReport.controllers'),
    ...require('./textmaterial.controllers')
}