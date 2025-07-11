const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('Acceso denegado');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
}

module.exports = { verifyToken };
