const express = require('express');
const cors = require('cors');
const app = express();
const api_routes = require('./routes/api.routes');

// Environment setting
require('dotenv').config();

// Databse setting
require('./config/database');

app.use(cors());
app.use(express.json());
app.use('/', api_routes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server runs on port 5000');
});