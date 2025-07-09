const mongoose = require('mongoose');
require('dotenv').config();

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGO, clientOptions);
        console.log('Connected to MongoDB');

    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}

module.exports = dbConection;

