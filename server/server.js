const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Testar conexão
sequelize.authenticate()
  .then(() => console.log('PostgreSQL conectado!'))
  .catch(err => console.error('Erro ao conectar:', err));

// Rota de exemplo
app.get('/api', (req, res) => {
  res.json({ message: 'Hello MERN Stack!' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});