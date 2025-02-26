
-- Criar a tabela de Quartos
CREATE TABLE quartos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    disponibilidade BOOLEAN DEFAULT TRUE
);

-- Criar a tabela de Clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

-- Criar a tabela de Reservas
CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    quarto_id INT NOT NULL,
    data_checkin DATE NOT NULL,
    data_checkout DATE NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (quarto_id) REFERENCES quartos(id) ON DELETE CASCADE
);

-- Criar a tabela de hóspedes (clientes adicionais na reserva)
CREATE TABLE hospedes (
    id SERIAL PRIMARY KEY,
    reserva_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE
);

ALTER TABLE reservas ADD COLUMN "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE reservas ADD COLUMN "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


INSERT INTO quartos (tipo, preco, disponibilidade) VALUES
('Standard', 150.00, TRUE),
('Standard', 150.00, TRUE),
('Standard', 150.00, FALSE), 
('Luxo', 300.00, TRUE),
('Luxo', 300.00, FALSE), 
('Luxo', 300.00, TRUE),
('Suíte', 500.00, TRUE),
('Suíte', 500.00, FALSE), 
('Suíte', 500.00, TRUE),
('Suíte', 500.00, TRUE);




INSERT INTO clientes (nome, email, telefone) VALUES
('João Silva', 'joao.silva@example.com', '(11) 99999-9999'),
('Maria Oliveira', 'maria.oliveira@example.com', '(11) 88888-8888'),
('Carlos Souza', 'carlos.souza@example.com', '(11) 77777-7777'),
('Ana Costa', 'ana.costa@example.com', '(11) 66666-6666'),
('Pedro Santos', 'pedro.santos@example.com', '(11) 55555-5555');



INSERT INTO reservas (cliente_id, quarto_id, data_checkin, data_checkout) VALUES
(1, 3, '2023-10-15', '2023-10-20'), 
(2, 5, '2023-10-16', '2023-10-18'),
(3, 8, '2023-10-17', '2023-10-22'); 





INSERT INTO hospedes (reserva_id, nome) VALUES
(1, 'Fernanda Lima'),
(1, 'Ricardo Almeida');

INSERT INTO hospedes (reserva_id, nome) VALUES
(2, 'Lucas Pereira'),
(2, 'Juliana Rocha');

INSERT INTO hospedes (reserva_id, nome) VALUES
(3, 'Patrícia Nunes'),
(3, 'Roberto Costa');








