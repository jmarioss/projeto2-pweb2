const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Cliente = sequelize.define('cliente', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    telefone: { type: DataTypes.STRING(20) }
}, {
    timestamps: true 
});

module.exports = Cliente;
