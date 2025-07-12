const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

module.exports = cors(corsOptions);

