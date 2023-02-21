require('dotenv').config({ path: `${__dirname}/.env`})
const PORT = process.env.PORT

const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.static('./docs'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
});