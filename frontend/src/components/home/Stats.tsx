import React, { useState, useEffect, useRef } from 'react';
import { Users, Briefcase, Calendar } from 'lucide-react';
import { API_URL } from '../../config';

const useCountUp = (target: number, duration: number = 1500, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    let frame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return count;
};

const Stats: React.FC = () => {
  const [egresados, setEgresados] = useState<number>(0);
  const [totalOfertas, setTotalOfertas] = useState<number>(0);
  const [totalEventos, setTotalEventos] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/public/stats`).then(r => r.json()).then(d => setEgresados(d.totalEgresados)).catch(() => {});
    fetch(`${API_URL}/empleos`).then(r => r.json()).then(d => setTotalOfertas(d.length)).catch(() => {});
    fetch(`${API_URL}/eventos`).then(r => r.json()).then(d => setTotalEventos(d.length)).catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const countEgresados = useCountUp(egresados, 1500, visible);
  const countOfertas = useCountUp(totalOfertas, 1200, visible);
  const countEventos = useCountUp(totalEventos, 800, visible);

  const items = [
    { icon: <Users size={36} className="text-secondary" />, value: countEgresados, label: 'Graduados Registrados' },
    { icon: <Briefcase size={36} className="text-secondary" />, value: countOfertas, label: 'Ofertas Laborales' },
    { icon: <Calendar size={36} className="text-secondary" />, value: countEventos, label: 'Eventos Programados' },
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-primary to-primary-dark">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nuestra Comunidad en Números
          </h2>
          <p className="text-white/70 text-lg">Una red en constante crecimiento</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: '0 8px 32px rgba(27,45,107,0.15)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 40px rgba(27,45,107,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,45,107,0.15)'; }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">{stat.icon}</div>
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-1">{stat.value}</h3>
                <div className="w-10 h-[3px] bg-secondary rounded-full mb-3"></div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
