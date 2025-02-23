const express = require('express');
const router = express.Router();
const Quarto = require('../models/quarto');

// Cadastrar novo quarto
router.post('/', async (req, res) => {
    try {
        const { tipo, preco, disponibilidade } = req.body;
        const novoQuarto = await Quarto.create({ tipo, preco, disponibilidade });
        res.status(201).json(novoQuarto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar quarto' });
    }
});

// Listar quartos
router.get('/', async (req, res) => {
    try {
        const quartos = await Quarto.findAll();
        res.json(quartos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar quartos' });
    }
});

// Atualizar quarto
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

// Verificar disponibilidade
router.get('/disponibilidade', async (req, res) => {
    // Lógica para verificar disponibilidade
});

module.exports = router;