const mongoose = require("mongoose");

async function connectDatabase(url) {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then((response) => {
                if (process.env.NODE_ENV != 'test') {
                    console.log(`Connection to ${mongoose.connection.name} database Successful!`)
                }
                resolve('Successful')
            }, (error) => {
                console.log(error)
                reject(error)
            });

    })
}

module.exports = connectDatabase