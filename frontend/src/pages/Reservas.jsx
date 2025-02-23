import React from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/reservas')
      .then(response => {
        setReservas(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando reservas...</p>;
  }

  if (error) {
    return <p>Erro ao carregar reservas: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Reservas</h2>
      <ul className="space-y-2">
        {reservas.map(r => (
          <li key={r.id} className="bg-white p-2 rounded shadow">
            Check-in: {new Date(r.checkIn).toLocaleDateString()} - Check-out: {new Date(r.checkOut).toLocaleDateString()} - Quarto: {r.quartoId} - Cliente: {r.clienteId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservas;