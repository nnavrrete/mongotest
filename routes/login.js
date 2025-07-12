const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middleware/jwt');


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
    res.status(200).send({ token });
});

router.get('/protected', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: 'Token no proporcionado' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Token inválido' });
        }
        res.status(200).send({ message: 'Acceso permitido', user: decoded });
    });
}
);

router.put('/logout', verifyToken, async (req, res) => {
    try {
        // Obtener el usuario desde el token que ya fue verificado por verifyToken
        const usuario = await User.findOne({ email: req.user.email });
        
        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        
        // Actualizar la última conexión
        usuario.lastConnection = new Date();
        await usuario.save();
        
        res.status(200).send({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al cerrar sesión', error: error.message });
    }
});


module.exports = router;
