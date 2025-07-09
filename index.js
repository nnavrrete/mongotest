const express = require('express');
const dotenv = require('dotenv');
const dbConection = require('./db/dbConection');
const User = require('./models/user');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

app.use(userRoutes);
app.use(loginRoutes);
dbConection().then(() => {
    app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
});


