const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva');

// Criar reserva
router.post('/', async (req, res) => {
    try {
        const { cliente_id, quarto_id, data_checkin, data_checkout } = req.body;
        const novaReserva = await Reserva.create({ cliente_id, quarto_id, data_checkin, data_checkout });
        res.status(201).json(novaReserva);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar reserva' });
    }
});

// Listar reservas
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar reservas' });
    }
});

module.exports = router;