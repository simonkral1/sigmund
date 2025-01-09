import React from 'react';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">Vítejte u Sigmunda</h1>
      <p className="text-xl text-center mb-8 text-gray-700 max-w-2xl">
        Váš důvěryhodný společník pro podporu duševního zdrav. S čím vám dnes mohu pomoci?
      </p>
      <img src="./eu-flag.svg" alt="Vlajka EU" className="w-6 h-4 mb-2" />
      <p className="text-sm text-center mb-4 text-gray-600">
        Tento prototyp byl vyvinut firmou Apenal. Projekt je spolufinancován Evropskou unií.
      </p>
      <a href="./chat" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
        Začít chat
      </a>
    </div>
  );
} 