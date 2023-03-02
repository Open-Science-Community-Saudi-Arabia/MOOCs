const environments = ['dev', 'test', 'prod']
if (environments.includes(process.env.NODE_ENV)) {
    require('dotenv').config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });
} else {
    require('dotenv').config({ path: `${__dirname}/.env` });
}

const config = require('./utils/config');
const app = require('./app');


const connectDatabase = require('./db/connectDB');

function getMongoURI() {
    return config['MONGO_URI' + (process.env.NODE_ENV ? `_${process.env.NODE_ENV.toUpperCase()}` : '')];
}

const PORT = config.PORT;
async function start() {
    try {
        await connectDatabase(getMongoURI());

        app.listen(PORT, function () {
            console.log(`Server is running on port ${PORT}....`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
