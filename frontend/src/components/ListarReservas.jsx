import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarReservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            const response = await axios.get('http://localhost:3001/reservas');
            setReservas(response.data);
        };
        fetchReservas();
    }, []);

    return (
        <div>
            <h2>Lista de Reservas</h2>
            <ul>
                {reservas.map(reserva => (
                    <li key={reserva.id}>
                        Cliente ID: {reserva.cliente_id} - Quarto ID: {reserva.quarto_id} - Check-in: {reserva.data_checkin} - Check-out: {reserva.data_checkout}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarReservas;