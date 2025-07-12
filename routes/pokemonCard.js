const router = require('express').Router();
const Card = require('../models/pokemonCard');
const { verifyToken } = require('../middleware/jwt');

router.post("/cards", verifyToken, async (req, res) => {
    try {
        const card = new Card(req.body);
        await card.save();
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
}
);

router.get("/cards", verifyToken, async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).send(cards);

    } catch (error) {
        res.status(400).send(error);
    }
});





module.exports = router;

