import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarReservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/reservas');
                console.log('Reservas recebidas:', response.data); // Log para verificar a resposta
                setReservas(response.data);
            } catch (error) {
                console.error('Erro ao buscar reservas:', error);
            }
        };
        fetchReservas();
    }, []);

    return (
        <div>
            <h2>Lista de Reservas</h2>
            {reservas.length === 0 ? (
                <p>Nenhuma reserva encontrada.</p> // Mensagem quando não há reservas
            ) : (
                <ul>
                    {reservas.map(reserva => (
                        <li key={reserva.id}>
                            Quarto ID: {reserva.quarto_id} - Check-in: {reserva.data_checkin} - Check-out: {reserva.data_checkout}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListarReservas;