import React from 'react'; // Adicione esta linha
function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Bem-vindo ao Sistema de Gerenciamento do Hotel</h1>
      <p className="text-center text-gray-700">
        Utilize o menu para navegar entre as seções de clientes, quartos e reservas.
      </p>
    </div>
  );
}

export default Home;