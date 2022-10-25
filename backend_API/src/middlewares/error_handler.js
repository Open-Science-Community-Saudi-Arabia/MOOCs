const { CustomAPIError } = require('../utils/custom_errors')

const handleDuplicateKey = (err) => {
  const errKeyValue = err.keyValue.email
  const message = `${errKeyValue} already exists please user another email`
  return new CustomAPIError(message, 400)
}

const handleValidationErr = (err) => {
  const errPath = Object.values(err.errors).map((el) => el.message)
  const message = `${errPath}, Try again`
  return new CustomAPIError(message, 400)
}

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV != 'test') {
      console.log(err)
  }
  //Send Operational Errors We Trust To Client
  let error = { ...err }
  if (error.code == 11000) error = handleDuplicateKey(error)
  if (error._message == 'User validation failed')
    error = handleValidationErr(error)

  if (error instanceof CustomAPIError || err instanceof CustomAPIError) {
    return res
      .status(error.statusCode || err.statusCode)
      .send({ message: error.message || err.message })
  } else {
    return res.status(500).send({ message: 'An error occurred' })
  }
}

module.exports = errorHandler
