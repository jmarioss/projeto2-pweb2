import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Ajuste o caminho conforme necessário

const ListarQuartos = () => {
  const [quartos, setQuartos] = useState([]);

  useEffect(() => {
    const fetchQuartos = async () => {
      try {
        const response = await api.get('/quartos'); // Ajuste a rota conforme necessário
        setQuartos(response.data);
      } catch (error) {
        console.error('Erro ao buscar quartos:', error);
      }
    };

    fetchQuartos();
  }, []);

  const handleUpdate = async (quarto) => {
    try {
      await api.put(`/quartos/${quarto.id}`, quarto); // Ajuste a rota conforme necessário
      alert('Quarto atualizado com sucesso!');
      // Recarrega a lista de quartos após a atualização
      const response = await api.get('/quartos');
      setQuartos(response.data);
    } catch (error) {
      console.error('Erro ao atualizar quarto:', error);
      alert('Erro ao atualizar quarto.');
    }
  };

  return (
    <div>
      <h2>Lista de Quartos</h2>
      {quartos.map((quarto) => (
        <div key={quarto.id}>
          <h3>Quarto ID: {quarto.id}</h3>
          <label>
            Tipo do Quarto:
            <input
              type="text"
              value={quarto.tipo}
              onChange={(e) => setQuartos((prev) => prev.map(q => q.id === quarto.id ? { ...q, tipo: e.target.value } : q))}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={quarto.preco}
              onChange={(e) => setQuartos((prev) => prev.map(q => q.id === quarto.id ? { ...q, preco: e.target.value } : q))}
            />
          </label>
          <label>
            Disponibilidade:
            <select
              value={quarto.disponibilidade}
              onChange={(e) => setQuartos((prev) => prev.map(q => q.id === quarto.id ? { ...q, disponibilidade: e.target.value === 'true' } : q))}
            >
              <option value="true">Disponível</option>
              <option value="false">Indisponível</option>
            </select>
          </label>
          <button onClick={() => handleUpdate(quarto)}>Atualizar Quarto</button>
        </div>
      ))}
    </div>
  );
};

export default ListarQuartos;