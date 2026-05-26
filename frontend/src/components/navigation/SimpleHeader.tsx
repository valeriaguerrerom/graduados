import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Shield, BarChart3 } from 'lucide-react';

interface SimpleHeaderProps {
  title: string;
  variant?: 'leader' | 'admin';
  onLogout: () => void;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({ title, variant = 'leader', onLogout }) => {
  const navigate = useNavigate();
  const bgColor = variant === 'admin' ? 'bg-gray-900' : 'bg-primary';
  const icon = variant === 'admin' ? <Shield size={24} /> : <BarChart3 size={24} />;

  return (
    <header className={`${bgColor} text-white shadow-lg`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h1 className="font-bold text-lg">{title}</h1>
            <p className="text-xs text-white/60">Universidad Mariana — Esp. SIG</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
            <Home size={16} />Inicio
          </button>
          <button onClick={onLogout} className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
            <LogOut size={16} />Salir
          </button>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
