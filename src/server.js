const db_connection = require('./config/Db_connection');
db_connection()

const routes = require('./index');
const express = require('express');
const app = express();
require('dotenv').config();



// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', routes);



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});