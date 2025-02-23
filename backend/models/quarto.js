const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Quarto = sequelize.define('quarto', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tipo: { type: DataTypes.STRING(50), allowNull: false },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    disponibilidade: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    timestamps: true // Adiciona createdAt e updatedAt
});

module.exports = Quarto;
