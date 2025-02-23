const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config');
const quartoRoutes = require('./routes/quartos');
const clienteRoutes = require('./routes/clientes');
const reservaRoutes = require('./routes/reservas');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use('/quartos', quartoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/reservas', reservaRoutes);

app.get('/', (req, res) => {
    res.send('API do sistema de gerenciamento de hotel rodando!');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
