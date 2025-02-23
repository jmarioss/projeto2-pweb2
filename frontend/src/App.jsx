import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CadastrarQuarto from './components/CadastrarQuarto';
import CadastrarCliente from './components/CadastrarCliente';
import CadastrarReserva from './components/CadastrarReserva';
import ListarQuartos from './components/ListarQuartos';
import ListarClientes from './components/ListarClientes';
import ListarReservas from './components/ListarReservas';

function App() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/cadastrar-quarto">Cadastrar Quarto</Link></li>
                    <li><Link to="/cadastrar-cliente">Cadastrar Cliente</Link></li>
                    <li><Link to="/cadastrar-reserva">Cadastrar Reserva</Link></li>
                    <li><Link to="/listar-quartos">Listar Quartos</Link></li>
                    <li><Link to="/listar-clientes">Listar Clientes</Link></li>
                    <li><Link to="/listar-reservas">Listar Reservas</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/cadastrar-quarto" element={<CadastrarQuarto />} />
                <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
                <Route path="/cadastrar-reserva" element={<CadastrarReserva />} />
                <Route path="/listar-quartos" element={<ListarQuartos />} />
                <Route path="/listar-clientes" element={<ListarClientes />} />
                <Route path="/listar-reservas" element={<ListarReservas />} />
                <Route path="/" element={<h1>Bem-vindo ao Sistema de Gerenciamento</h1>} />
            </Routes>
        </>
    );
}

export default App;