const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva');
const Hospede = require('../models/hospede'); // Importar o modelo de hóspedes
const Quarto = require('../models/quarto'); // Importar o modelo de Quarto
const { Sequelize } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            include: [
                {
                    model: Quarto, // Inclui o modelo Quarto
                    attributes: ['id', 'tipo'] // Especifica os atributos que você deseja retornar
                }
            ]
        });
        res.json(reservas); // Retorna as reservas com os quartos
    } catch (error) {
        console.error('Erro ao listar reservas:', error); // Log do erro
        res.status(500).json({ error: 'Erro ao listar reservas' }); // Retorna erro
    }
});

router.post('/', async (req, res) => {
    try {
        const { cliente_id, quarto_id, data_checkin, data_checkout, hospedes } = req.body;

        // Verificar se o número de hóspedes não excede 3
        if (hospedes.length > 3) {
            return res.status(400).json({ error: 'O número máximo de hóspedes é 3.' });
        }

        // Criar nova reserva
        const novaReserva = await Reserva.create({
            cliente_id, // Usar diretamente o cliente_id
            quarto_id,
            data_checkin,
            data_checkout
        });

        // Adicionar hóspedes à reserva
        for (const id of hospedes) {
            await Hospede.create({ nome: id, reserva_id: novaReserva.id }); // Certifique-se de que está passando o nome correto
        }

        res.status(201).json(novaReserva); // Retorna a nova reserva criada
    } catch (error) {
        console.error('Erro ao cadastrar reserva:', error); // Log do erro
        res.status(500).json({ error: 'Erro ao cadastrar reserva' }); // Retorna erro
    }
});

module.exports = router;