import React from 'react';
import { ArrowRight, LogIn, Briefcase, Users, BookOpen, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="relative text-white overflow-hidden min-h-[calc(100vh-140px)] flex items-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')] bg-cover bg-center"
        style={{ transform: 'scale(1.05)' }}
      ></div>
      {/* Gradient overlay with depth */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,45,107,0.82) 0%, rgba(27,45,107,0.5) 50%, rgba(0,0,0,0.6) 100%)' }}></div>
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {isAuthenticated ? (
            <>
              <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-4 animate-fade-in-down">
                <p className="text-secondary font-semibold">
                  ¡Bienvenido, {user?.nombre}! 👋
                </p>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-down delay-200" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                Tu Red Profesional te Espera
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in-up delay-400 max-w-2xl mx-auto">
                Explora oportunidades, conecta con otros graduados y potencia tu carrera profesional
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-600">
                <Link to="/jobs">
                  <Button variant="secondary" size="lg" className="min-w-[200px] shadow-[0_4px_20px_rgba(245,166,35,0.4)] hover:-translate-y-0.5 transition-all">
                    Ver Empleos <ArrowRight size={18} className="ml-2 inline" />
                  </Button>
                </Link>
                <Link to="/networking">
                  <button className="min-w-[200px] border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300">
                    Explorar Eventos
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight animate-fade-in-down" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                Red de Graduados
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-4 animate-fade-in-up delay-200">
                Especialización en Sistemas Integrados de Gestión
              </p>
              <p className="text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
                Conectando profesionales, construyendo futuros. Un espacio exclusivo para el crecimiento profesional de nuestros graduados.
              </p>

              {/* Feature cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 animate-fade-in-up delay-400">
                {[
                  { icon: <Briefcase size={22} />, label: 'Ofertas Laborales' },
                  { icon: <Users size={22} />, label: 'Networking' },
                  { icon: <BookOpen size={22} />, label: 'Eventos y Cursos' },
                  { icon: <Building size={22} />, label: 'Empresas Aliadas' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/12 backdrop-blur-[8px] border border-white/25 rounded-xl px-4 py-4 flex flex-col items-center gap-2 hover:bg-[rgba(245,166,35,0.25)] hover:border-secondary transition-all duration-300 cursor-default"
                  >
                    <span className="text-secondary">{item.icon}</span>
                    <span className="text-white text-xs font-medium text-center">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="animate-fade-in-up delay-600">
                <Link to="/login">
                  <Button variant="secondary" size="lg" className="min-w-[260px] text-base shadow-[0_4px_20px_rgba(245,166,35,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                    <LogIn size={20} className="mr-2 inline" />
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent"></div>
    </div>
  );
};

export default Hero;
