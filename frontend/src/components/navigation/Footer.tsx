import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import logoImg from '../../assets/logo';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Brief */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-lg p-1">
                <img 
                  src={logoImg} 
                  alt="Universidad Mariana" 
                  className="h-14 w-14 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <GraduationCap size={28} className="text-primary hidden" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-lg">Universidad Mariana</span>
                <span style={{ color: 'rgba(255,255,255,0.55)' }} className="text-sm">Esp. Sistemas Integrados de Gestión</span>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem' }} className="leading-relaxed">
              Red de Graduados de la Especialización en Sistemas Integrados de Gestión.
              Conectando profesionales, construyendo futuros.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: '#FFFFFF', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' as const }}>
              Enlaces Rápidos
            </h3>
            <div style={{ width: '32px', borderBottom: '1px solid rgba(255,255,255,0.3)', marginTop: '8px', marginBottom: '12px' }}></div>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', path: '/' },
                { label: 'Eventos y Networking', path: '/networking' },
                { label: 'Recursos y Herramientas', path: '/resources' },
                { label: 'Ofertas Laborales', path: '/jobs' },
                { label: 'Encuestas', path: '/surveys' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    className="hover:text-white hover:pl-1.5 transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: '#FFFFFF', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' as const }}>
              Contacto
            </h3>
            <div style={{ width: '32px', borderBottom: '1px solid rgba(255,255,255,0.3)', marginTop: '8px', marginBottom: '12px' }}></div>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }} />
                <span style={{ color: 'rgba(255,255,255,0.65)' }} className="text-sm">Calle 18 No. 34-104, Pasto, Nariño, Colombia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }} />
                <span style={{ color: 'rgba(255,255,255,0.65)' }} className="text-sm">(+57) 602-7314923 Ext. 293</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }} />
                <span style={{ color: 'rgba(255,255,255,0.65)' }} className="text-xs">egresadosespsistintegradosg@umariana.edu.co</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
              © {new Date().getFullYear()} Universidad Mariana - Esp. Sistemas Integrados de Gestión. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.umariana.edu.co/politicas-proteccion-datos.html" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }} className="hover:text-white transition-colors duration-200">Política de Privacidad</a>
              <a href="https://www.umariana.edu.co/pdf/condiciones-uso-terminos-legales.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }} className="hover:text-white transition-colors duration-200">Términos de Uso</a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
              {atob('MjAyNiDCtyBEZXZlbG9wZXIgVmFsZXJpYSBHdWVycmVybyBNZWrDrWEgwrcgdmFsZXJpYXNvLmd1ZXJyZXJvQHVtYXJpYW5hLmVkdS5jbw==')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
