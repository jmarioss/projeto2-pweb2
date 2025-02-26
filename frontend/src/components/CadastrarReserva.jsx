import React, { useState } from 'react';
import axios from 'axios';

const CadastrarReserva = () => {
    const [cliente_id, setClienteId] = useState('');
    const [quarto_id, setQuartoId] = useState('');
    const [data_checkin, setDataCheckin] = useState('');
    const [data_checkout, setDataCheckout] = useState('');
    const [hospedes, setHospedes] = useState([{ nome: '' }]);
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (hospedes.length > 3) {
            alert('O número máximo de hóspedes é 3.');
            return;
        }

        try {
            await axios.post('http://localhost:3001/reservas', { 
                cliente_id, 
                quarto_id, 
                data_checkin, 
                data_checkout, 
                hospedes 
            });
            setMensagemSucesso('Reserva cadastrada com sucesso!'); // Mensagem de sucesso
            // Limpar os campos após o cadastro
            setClienteId('');
            setQuartoId('');
            setDataCheckin('');
            setDataCheckout('');
            setHospedes([{ nome: '' }]);
        } catch (error) {
            alert('Erro ao cadastrar reserva');
        }
    };

    const handleHospedeChange = (index, value) => {
        const newHospedes = [...hospedes];
        newHospedes[index].nome = value;
        setHospedes(newHospedes);
    };

    const addHospede = () => {
        if (hospedes.length < 3) {
            setHospedes([...hospedes, { nome: '' }]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={cliente_id} onChange={(e) => setClienteId(e.target.value)} placeholder="ID do Cliente" />
            <input type="number" value={quarto_id} onChange={(e) => setQuartoId(e.target.value)} placeholder="ID do Quarto" />
            <input type="date" value={data_checkin} onChange={(e) => setDataCheckin(e.target.value)} />
            <input type="date" value={data_checkout} onChange={(e) => setDataCheckout(e.target.value)} />
            {hospedes.map((hospede, index) => (
                <input 
                    key={index} 
                    value={hospede.nome} 
                    onChange={(e) => handleHospedeChange(index, e.target.value)} 
                    placeholder={`Nome do Hóspede ${index + 1}`} 
                />
            ))}
            <button type="button" onClick={addHospede}>Adicionar Hóspede</button>
            <button type="submit">Cadastrar Reserva</button>
            {mensagemSucesso && <p>{mensagemSucesso}</p>} {/* Exibir mensagem de sucesso */}
        </form>
    );
};

export default CadastrarReserva;