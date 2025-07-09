const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

module.exports = cors(corsOptions);

