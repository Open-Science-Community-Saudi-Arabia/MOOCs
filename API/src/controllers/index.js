/**
 * API Documentation
 *
 * @category API
 * @member Controllers
 * @description This module contains the controllers for the API
 * 
 * @member Models
 * @description This module contains the models for the API
 * 
 * */




module.exports = {
    ...require('./auth.controllers'),
    ...require('./course.controllers'),
    ...require('./exercise.controllers'),
    ...require('./courseReport.controllers'),
    ...require('./textmaterial.controllers')
}