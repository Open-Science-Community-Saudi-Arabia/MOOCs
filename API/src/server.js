const environments = ['dev', 'test', 'prod']
const NODE_ENV = process.env.NODE_ENV
if (environments.includes(NODE_ENV)) {
    require('dotenv').config({ path: `${__dirname}/.env.${NODE_ENV}` });
} else {
    require('dotenv').config({ path: `${__dirname}/.env` });
}

// Project config variables
const config = require('./utils/config');

const connectDatabase = require('./db/connectDB');
function getMongoURI() {
    return config['MONGO_URI' + (environments.includes(NODE_ENV) ? `_${NODE_ENV.toUpperCase()}` : '')];
}

const app = require('./app');
const { default: axios } = require('axios');
const PORT = config.PORT;
async function start() {
    try {
        await connectDatabase(getMongoURI());

        app.listen(PORT, function () {
            console.log(`Server is running on port ${PORT}....`);
        });

        const service_data = {
            port: parseInt(PORT),
            name: 'moocs',
            version: '1'
        }
        await axios
            .post('http://localhost:5500/host/registry/service/register', service_data)
            .then(res => res)
            .catch(err => err)

    } catch (error) {
        console.log(error);
    }
}

start();
