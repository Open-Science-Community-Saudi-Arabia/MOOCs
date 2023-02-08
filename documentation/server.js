require('dotenv').config()
const connect = require('connect');
const serveStatic = require('serve-static')
const PORT = process.env.PORT || 8080

connect()
    .use(serveStatic(__dirname + '/docs'))
    .listen(PORT, () => console.log(`Server running on ${PORT}...`));