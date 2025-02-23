import React, { useState } from 'react';
import axios from 'axios';

const CadastrarCliente = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/clientes', { nome, email, telefone });
        // Adicione lógica para lidar com a resposta
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
            <button type="submit">Cadastrar Cliente</button>
        </form>
    );
};

export default CadastrarCliente;