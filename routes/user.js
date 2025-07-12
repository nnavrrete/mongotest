const router = require('express').Router();
const User = require('../models/user');
const { verifyToken } = require('../middleware/jwt');


router.post("/users",  async (req, res) => {
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

router.get("/users/:email", verifyToken, async (req, res) => {
    try {
        const usuario = await User.findOne({ email: req.params.email });
        res.status(200).send(usuario);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put("/users/:email", verifyToken, async (req, res) => {
    try {
        const usuario = await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
        res.status(200).send(usuario);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete("/users/:email", verifyToken, async (req, res) => {
    try {
        await User.findOneAndDelete({ email: req.params.email });
        res.status(200).send({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;