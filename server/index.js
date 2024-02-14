const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const dotenv = require('dotenv');
dotenv.config();app.use(cors());
app.use(express.json());

const server=app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
}) 