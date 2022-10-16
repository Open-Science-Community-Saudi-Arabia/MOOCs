const { CustomAPIError } = require('../utils/custom_errors');

const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV != "test") { console.log(err) }
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).send({ message: err.message })
    }

    return res.status(500).send({ message: "An error occured" })
}


module.exports = errorHandler