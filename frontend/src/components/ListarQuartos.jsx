import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarQuartos = () => {
    const [quartos, setQuartos] = useState([]);

    useEffect(() => {
        const fetchQuartos = async () => {
            const response = await axios.get('http://localhost:3001/quartos');
            setQuartos(response.data);
        };
        fetchQuartos();
    }, []);

    return (
        <div>
            <h2>Lista de Quartos</h2>
            <ul>
                {quartos.map(quarto => (
                    <li key={quarto.id}>
                        {quarto.tipo} - R${quarto.preco} - Disponível: {quarto.disponibilidade ? 'Sim' : 'Não'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarQuartos;