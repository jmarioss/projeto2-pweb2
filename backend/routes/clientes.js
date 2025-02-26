const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

router.post('/', async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        const novoCliente = await Cliente.create({ nome, email, telefone });
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
});

router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar clientes' });
    }
});

module.exports = router;