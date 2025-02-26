const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva');
const Hospede = require('../models/hospede'); // Importar o modelo de hóspedes

router.post('/', async (req, res) => {
    try {
        const { cliente_id, quarto_id, data_checkin, data_checkout, hospedes } = req.body;

        // Verificar se o número de hóspedes não excede 3
        if (hospedes.length > 3) {
            return res.status(400).json({ error: 'O número máximo de hóspedes é 3.' });
        }

        const novaReserva = await Reserva.create({ cliente_id, quarto_id, data_checkin, data_checkout });

        // Adicionar hóspedes à reserva
        for (const hospede of hospedes) {
            await Hospede.create({ nome: hospede.nome, reserva_id: novaReserva.id });
        }

        res.status(201).json(novaReserva);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar reserva' });
    }
});

router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ include: Hospede }); // Incluir hóspedes nas reservas
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar reservas' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { cliente_id, quarto_id, data_checkin, data_checkout, hospedes } = req.body;

        // Verificar se o número de hóspedes não excede 3
        if (hospedes.length > 3) {
            return res.status(400).json({ error: 'O número máximo de hóspedes é 3.' });
        }

        // Verificar disponibilidade do quarto
        const reservasExistentes = await Reserva.findAll({
            where: {
                quarto_id,
                [Op.or]: [
                    {
                        data_checkin: {
                            [Op.lte]: data_checkout, // check-in é antes do check-out
                        },
                        data_checkout: {
                            [Op.gte]: data_checkin, // check-out é depois do check-in
                        },
                    },
                ],
            },
        });

        if (reservasExistentes.length > 0) {
            return res.status(400).json({ error: 'O quarto já está reservado para essas datas.' });
        }

        const novaReserva = await Reserva.create({ cliente_id, quarto_id, data_checkin, data_checkout });

        // Adicionar hóspedes à reserva
        for (const hospede of hospedes) {
            await Hospede.create({ nome: hospede.nome, reserva_id: novaReserva.id });
        }

        res.status(201).json(novaReserva);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar reserva' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { cliente_id, quarto_id, data_checkin, data_checkout } = req.query;

        const whereConditions = {};

        if (cliente_id) {
            whereConditions.cliente_id = cliente_id;
        }

        if (quarto_id) {
            whereConditions.quarto_id = quarto_id;
        }

        if (data_checkin) {
            whereConditions.data_checkin = {
                [Op.gte]: data_checkin, // Filtrar reservas a partir da data de check-in
            };
        }

        if (data_checkout) {
            whereConditions.data_checkout = {
                [Op.lte]: data_checkout, // Filtrar reservas até a data de check-out
            };
        }

        const reservas = await Reserva.findAll({
            where: whereConditions,
            include: Hospede, // Incluir hóspedes nas reservas
        });

        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar reservas' });
    }
});

module.exports = router;