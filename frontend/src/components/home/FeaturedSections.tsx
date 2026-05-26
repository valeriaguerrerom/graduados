import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Briefcase, FileText, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const FeaturedSections: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featuredSections = [
    {
      id: 'events',
      title: 'Eventos y Webinars',
      description: 'Participa en eventos exclusivos diseñados para potenciar tu desarrollo profesional.',
      icon: <Calendar size={36} className="text-secondary" />,
      link: '/networking',
      protected: true,
    },
    {
      id: 'jobs',
      title: 'Ofertas Laborales',
      description: 'Accede a oportunidades de empleo exclusivas para graduados de la Universidad Mariana.',
      icon: <Briefcase size={36} className="text-secondary" />,
      link: '/jobs',
      protected: true,
    },
    {
      id: 'resources',
      title: 'Recursos y Herramientas',
      description: 'Descarga material exclusivo para impulsar tu carrera profesional.',
      icon: <FileText size={36} className="text-secondary" />,
      link: '/resources',
      protected: true,
    },
  ];

  const handleClick = (section: typeof featuredSections[0]) => {
    const path = section.protected && !isAuthenticated ? '/login' : section.link;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {featuredSections.map((section, index) => (
        <div 
          key={section.id} 
          onClick={() => handleClick(section)}
          className={`block group cursor-pointer ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: visible ? `${index * 0.15}s` : '0s' }}
        >
          <div
            className="h-full relative overflow-hidden bg-white rounded-xl border-l-4 border-secondary p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 group-hover:border-l-primary"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(27,45,107,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
          >
            {section.protected && !isAuthenticated && (
              <div className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full z-10">
                <Lock size={14} />
              </div>
            )}
            <div className="mb-5 p-4 bg-primary/5 rounded-full group-hover:bg-secondary/10 transition-colors duration-300">
              {section.icon}
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">{section.title}</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{section.description}</p>
            {section.protected && !isAuthenticated && (
              <span className="text-sm text-secondary font-semibold group-hover:text-primary transition-colors">
                Inicia sesión para acceder →
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSections;
