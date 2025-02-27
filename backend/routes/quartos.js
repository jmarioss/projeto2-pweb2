const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Importar Op para condições de consulta
const Quarto = require('../models/quarto');
const Reserva = require('../models/reserva'); // Importar o modelo de Reserva
const { Sequelize } = require('sequelize');

// Rota para cadastrar um novo quarto
router.post('/', async (req, res) => {
    try {
        const { tipo, preco, disponibilidade } = req.body;
        const novoQuarto = await Quarto.create({ tipo, preco, disponibilidade });
        res.status(201).json(novoQuarto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar quarto' });
    }
});

// Rota para listar todos os quartos
router.get('/', async (req, res) => {
    try {
        const quartos = await Quarto.findAll();
        res.json(quartos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar quartos' });
    }
});

// Rota para atualizar um quarto
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, preco, disponibilidade } = req.body;
        await Quarto.update({ tipo, preco, disponibilidade }, { where: { id } });
        res.status(200).json({ message: 'Quarto atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar quarto' });
    }
});


module.exports = router;