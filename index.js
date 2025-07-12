const express = require('express');
const dotenv = require('dotenv');
const dbConection = require('./db/dbConection');
const cors = require('./middleware/cors');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const cardRoutes = require('./routes/pokemonCard');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(userRoutes);
app.use(loginRoutes);
app.use(cardRoutes);

dbConection().then(() => {
    app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
});


