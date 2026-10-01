const express = require('express');
const cors = require('cors');
require('dotenv').config();
const createTables = require('./src/models/initDb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialisation des tables au démarrage du serveur
createTables();

// Route de test
app.get('/', (req, res) => {
    res.json({ message: "API PERN (PostgreSQL) du Planificateur LinkedIn en marche !" });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
});