const router = require('express').Router();
const User = require('../models/user');
const { verifyToken } = require('../middleware/jwt');


router.post("/users", verifyToken, async (req, res) => {
    try {
        const usuario = new User(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/users", verifyToken, async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/users/:correo", verifyToken, async (req, res) => {
    try {
        const usuario = await User.findOne({ correo: req.params.correo });
        res.status(200).send(usuario);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put("/users/:correo", verifyToken, async (req, res) => {
    try {
        const usuario = await User.findOneAndUpdate({ correo: req.params.correo }, req.body, { new: true });
        res.status(200).send(usuario);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete("/users/:correo", verifyToken, async (req, res) => {
    try {
        await User.findOneAndDelete({ correo: req.params.correo });
        res.status(200).send({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;