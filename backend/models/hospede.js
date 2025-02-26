const { DataTypes } = require('sequelize');
const sequelize = require('../config');
//const Reserva = require('./reserva');

const Hospede = sequelize.define('hospede', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    reserva_id: { type: DataTypes.INTEGER, allowNull: false },
    nome: { type: DataTypes.STRING(100), allowNull: false }
}, {
    timestamps: true 
});

//Hospede.belongsTo(Reserva, { foreignKey: 'reserva_id', onDelete: 'CASCADE' });

module.exports = Hospede;