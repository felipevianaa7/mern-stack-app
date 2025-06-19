const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com PostgreSQL - Versão melhorada
const sequelize = new Sequelize({
  database: 'mern_db',
  username: 'felipe',
  password: '3espadas',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: console.log,
  retry: {
    max: 5,
    timeout: 5000
  }
});

// Testar conexão com tratamento melhorado
sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL conectado!');
    // Sincroniza modelos (opcional)
    sequelize.sync({ alter: true });
  })
  .catch(err => {
    console.error('❌ Erro de conexão:', err.original);
    process.exit(1); // Encerra o app se não conectar
  });

// Rota de teste melhorada
app.get('/test-db', async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `);
    res.json({ 
      success: true,
      tables: results.map(r => r.table_name),
      status: 'Banco de dados operacional'
    });
  } catch (error) {
    console.error('Erro na query:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: {
        database: sequelize.config.database,
        user: sequelize.config.username,
        host: sequelize.config.host
      }
    });
  }
});

// Rota básica de saúde
app.get('/health', (req, res) => {
  res.json({ 
    status: 'up',
    db: sequelize.authenticate() ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Teste: http://localhost:${PORT}/test-db`);
});


app.get('/db-content', async (req, res) => {
  try {
    const [users] = await sequelize.query('SELECT * FROM users');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});