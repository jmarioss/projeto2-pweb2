import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Ajuste o caminho conforme necessário

const CadastrarReservas = () => {
  const [clientes, setClientes] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [hospedesSelecionados, setHospedesSelecionados] = useState([]);
  const [quartoSelecionado, setQuartoSelecionado] = useState('');
  const [dataCheckin, setDataCheckin] = useState('');
  const [dataCheckout, setDataCheckout] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get('/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const fetchQuartos = async () => {
    try {
      const response = await api.get('/quartos'); // Usando a mesma rota do listar quartos
      setQuartos(response.data);
    } catch (error) {
      console.error('Erro ao buscar quartos:', error);
    }
  };

  useEffect(() => {
    fetchQuartos(); // Chama a função para buscar quartos ao montar o componente
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar a reserva, usando hospedesSelecionados e quartoSelecionado
  };

  const addHospede = () => {
    if (hospedesSelecionados.length < 3) {
      setHospedesSelecionados([...hospedesSelecionados, '']);
    } else {
      alert('Você já selecionou 3 hóspedes.');
    }
  };

  const handleHospedeChange = (index, value) => {
    const newHospedes = [...hospedesSelecionados];
    newHospedes[index] = value;
    setHospedesSelecionados(newHospedes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="hospede">Selecione os Hóspedes:</label>
      {hospedesSelecionados.map((hospede, index) => (
        <select
          key={index}
          value={hospede}
          onChange={(e) => handleHospedeChange(index, e.target.value)}
        >
          <option value="">Selecione um hóspede</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      ))}
      <button type="button" onClick={addHospede}>Adicionar Hóspede</button>

      <label htmlFor="dataCheckin">Data de Check-in:</label>
      <input
        type="date"
        id="dataCheckin"
        value={dataCheckin}
        onChange={(e) => setDataCheckin(e.target.value)}
      />

      <label htmlFor="dataCheckout">Data de Check-out:</label>
      <input
        type="date"
        id="dataCheckout"
        value={dataCheckout}
        onChange={(e) => setDataCheckout(e.target.value)}
      />

      <label htmlFor="quarto">Selecione o Quarto:</label>
      <select
        id="quarto"
        value={quartoSelecionado}
        onChange={(e) => setQuartoSelecionado(e.target.value)}
      >
        <option value="">Selecione um quarto</option>
        {quartos.length > 0 ? (
          quartos.filter(quarto => quarto.disponibilidade).map((quarto) => (
            <option key={quarto.id} value={quarto.id}>
              {quarto.tipo} - R${quarto.preco} - Disponível: Sim
            </option>
          ))
        ) : (
          <option value="">Nenhum quarto disponível</option>
        )}
      </select>

      <button type="submit">Cadastrar Reserva</button>
    </form>
  );
};

export default CadastrarReservas;