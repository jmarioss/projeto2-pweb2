import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarClientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            const response = await axios.get('http://localhost:3001/clientes');
            setClientes(response.data);
        };
        fetchClientes();
    }, []);

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.nome} - {cliente.email} - {cliente.telefone}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarClientes;