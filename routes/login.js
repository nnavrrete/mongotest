const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ nombre: user.nombre, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
});



module.exports = router;
