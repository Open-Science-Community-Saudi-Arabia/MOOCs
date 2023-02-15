require('dotenv').config({ path: `${__dirname}/.env`})
const PORT = process.env.PORT

const express = require('express');
const app = express();

app.use(express.static('./docs'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
});