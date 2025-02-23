import React, { useState } from 'react';
import axios from 'axios';

const CadastrarReserva = () => {
    const [cliente_id, setClienteId] = useState('');
    const [quarto_id, setQuartoId] = useState('');
    const [data_checkin, setDataCheckin] = useState('');
    const [data_checkout, setDataCheckout] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/reservas', { cliente_id, quarto_id, data_checkin, data_checkout });
        // Adicione lógica para lidar com a resposta
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={cliente_id} onChange={(e) => setClienteId(e.target.value)} placeholder="ID do Cliente" />
            <input type="number" value={quarto_id} onChange={(e) => setQuartoId(e.target.value)} placeholder="ID do Quarto" />
            <input type="date" value={data_checkin} onChange={(e) => setDataCheckin(e.target.value)} />
            <input type="date" value={data_checkout} onChange={(e) => setDataCheckout(e.target.value)} />
            <button type="submit">Cadastrar Reserva</button>
        </form>
    );
};

export default CadastrarReserva;