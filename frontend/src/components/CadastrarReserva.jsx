import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Ajuste o caminho conforme necessário

const CadastrarReservas = () => {
  const [clientes, setClientes] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [quartosDisponiveis, setQuartosDisponiveis] = useState([]); // Estado para quartos disponíveis
  const [hospedesSelecionados, setHospedesSelecionados] = useState(['']); // Iniciar com um hóspede vazio
  const [quartoSelecionado, setQuartoSelecionado] = useState('');
  const [dataCheckin, setDataCheckin] = useState('');
  const [dataCheckout, setDataCheckout] = useState('');
  const [hospedePagante, setHospedePagante] = useState(''); // ID do hóspede que irá pagar

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
      const response = await api.get('/quartos'); // Usando a rota para buscar todos os quartos
      setQuartos(response.data);
      // Filtra os quartos disponíveis
      const quartosDisponiveis = response.data.filter(quarto => quarto.disponibilidade);
      setQuartosDisponiveis(quartosDisponiveis);
    } catch (error) {
      console.error('Erro ao buscar quartos:', error);
    }
  };

  useEffect(() => {
    fetchQuartos(); // Chama a função para buscar todos os quartos
  }, []);

  const handleHospedeChange = (index, value) => {
    const novosHospedes = [...hospedesSelecionados];
    novosHospedes[index] = value; // Atualiza o hóspede selecionado
    setHospedesSelecionados(novosHospedes);
  };

  const addHospede = () => {
    setHospedesSelecionados([...hospedesSelecionados, '']); // Adiciona um novo hóspede vazio
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Coleta os dados do formulário
    const reservaData = {
      cliente_id: hospedePagante, // ID do hóspede que irá pagar
      hospedes: hospedesSelecionados.filter(Boolean), // Filtra hóspedes vazios e envia apenas os IDs
      quarto_id: quartoSelecionado,
      data_checkin: dataCheckin,
      data_checkout: dataCheckout
    };

    try {
      const response = await api.post('/reservas', reservaData);
      console.log('Reserva cadastrada com sucesso:', response.data);
      // Limpa os campos após o envio
      setQuartoSelecionado('');
      setDataCheckin('');
      setDataCheckout('');
      setHospedesSelecionados(['']); // Reinicia a lista de hóspedes
      setHospedePagante(''); // Limpa o hóspede pagante
    } catch (error) {
      console.error('Erro ao cadastrar reserva:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Reserva</h2>
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

      <label htmlFor="hospedePagante">Selecione o Hóspede Pagante:</label>
      <select
        id="hospedePagante"
        value={hospedePagante}
        onChange={(e) => setHospedePagante(e.target.value)}
        required
      >
        <option value="">Selecione um hóspede</option>
        {clientes.map(cliente => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nome}
          </option>
        ))}
      </select>

      <label htmlFor="dataCheckin">Data de Check-in:</label>
      <input
        type="date"
        id="dataCheckin"
        value={dataCheckin}
        onChange={(e) => setDataCheckin(e.target.value)}
        required
      />

      <label htmlFor="dataCheckout">Data de Check-out:</label>
      <input
        type="date"
        id="dataCheckout"
        value={dataCheckout}
        onChange={(e) => setDataCheckout(e.target.value)}
        required
      />

      <label htmlFor="quarto">Selecione o Quarto:</label>
      <select
        id="quarto"
        value={quartoSelecionado}
        onChange={(e) => setQuartoSelecionado(e.target.value)}
        required
      >
        <option value="">Selecione um quarto</option>
        {quartosDisponiveis.length > 0 ? (
          quartosDisponiveis.map((quarto) => (
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