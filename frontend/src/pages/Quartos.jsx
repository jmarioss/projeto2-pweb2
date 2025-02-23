import React from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';

function Quartos() {
  const [quartos, setQuartos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/quartos')
      .then(response => {
        setQuartos(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando quartos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar quartos: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Quartos</h2>
      <ul className="space-y-2">
        {quartos.map(q => (
          <li key={q.id} className="bg-white p-2 rounded shadow">
            {q.tipo} - R${q.preco} - {q.disponivel ? 'Disponível' : 'Ocupado'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quartos;