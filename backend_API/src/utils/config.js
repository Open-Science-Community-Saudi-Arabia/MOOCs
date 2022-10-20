const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

/* JWT TOKENS */
const JWT_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_SECRET_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN

module.exports = {
    MONGO_URI,
    PORT,
    JWT_SECRET,
    JWT_SECRET_EXPIRES_IN
}