import React, { useState } from 'react';
import axios from 'axios';

const CadastrarQuarto = () => {
    const [tipo, setTipo] = useState('');
    const [preco, setPreco] = useState('');
    const [disponibilidade, setDisponibilidade] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/quartos', { tipo, preco, disponibilidade });
        // Adicione lógica para lidar com a resposta
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" />
            <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
            <button type="submit">Cadastrar Quarto</button>
        </form>
    );
};

export default CadastrarQuarto;