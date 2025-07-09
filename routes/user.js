const router = require('express').Router();
const User = require('../models/user');

router.post("/users", async (req, res) => {
    try {
        const usuario = new User(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/users", async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        res.status(200).send(usuario);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put("/users/:id", async (req, res) => {
    try {
        const usuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(usuario);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;