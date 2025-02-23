const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Cliente = require('./cliente');
const Quarto = require('./quarto');

const Reserva = sequelize.define('reserva', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cliente_id: { type: DataTypes.INTEGER, allowNull: false },
    quarto_id: { type: DataTypes.INTEGER, allowNull: false },
    data_checkin: { type: DataTypes.DATEONLY, allowNull: false },
    data_checkout: { type: DataTypes.DATEONLY, allowNull: false }
}, {
    timestamps: true // Adiciona createdAt e updatedAt
});

// Define relationships
Reserva.belongsTo(Cliente, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
Reserva.belongsTo(Quarto, { foreignKey: 'quarto_id', onDelete: 'CASCADE' });

module.exports = Reserva;
