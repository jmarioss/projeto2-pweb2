import React from 'react';
import { Link } from 'react-router-dom';

const Navegacao = () => {
    return (
        <nav>
            <h2>Gerenciamento de Quartos</h2>
            <ul>
                <li>
                    <Link to="/cadastrar-quarto">Cadastrar Quarto</Link>
                </li>
                <li>
                    <Link to="/listar-quartos">Listar Quartos</Link>
                </li>
            </ul>

            <h2>Gestão de Clientes</h2>
            <ul>
                <li>
                    <Link to="/cadastrar-cliente">Cadastrar Cliente</Link>
                </li>
                <li>
                    <Link to="/listar-clientes">Listar Clientes</Link>
                </li>
            </ul>

            <h2>Reservas de Quartos</h2>
            <ul>
                <li>
                    <Link to="/cadastrar-reserva">Cadastrar Reserva</Link>
                </li>
                <li>
                    <Link to="/listar-reservas">Listar Reservas</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navegacao;