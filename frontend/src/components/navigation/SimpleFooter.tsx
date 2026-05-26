import React from 'react';

const SimpleFooter: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Universidad Mariana — Esp. Sistemas Integrados de Gestion</p>
        <p className="mt-1">2026 · Developer Valeria Guerrero Mejia · valeriaso.guerrero@umariana.edu.co</p>
      </div>
    </footer>
  );
};

export default SimpleFooter;
