import React, { useState, useEffect } from 'react';
import { Video, Lock, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../config';

interface Testimonio {
  id: number;
  titulo: string;
  descripcion: string;
  youtube_url: string;
  nombre_egresado: string;
  cargo: string;
}

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('embed/')) return url;
  if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
  if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
  return url;
};

const Testimonials: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/testimonios`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { if (Array.isArray(data)) setTestimonios(data); setLoading(false); })
      .catch(() => { setTestimonios([]); setLoading(false); });
  }, []);

  useEffect(() => {
    if (testimonios.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonios.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonios.length]);

  const prev = () => setCurrent(c => (c - 1 + testimonios.length) % testimonios.length);
  const next = () => setCurrent(c => (c + 1) % testimonios.length);

  if (loading) return null;
  if (testimonios.length === 0) {
    return (
      <div className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-3">Testimonios de Graduados</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Próximamente conocerás las historias de éxito de nuestros graduados.
            </p>
          </div>
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-12 text-center text-white">
            <Video size={48} className="mx-auto mb-4 opacity-60" />
            <p className="text-white/70">Los testimonios estarán disponibles pronto.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-3">Testimonios de Graduados</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce las historias de éxito de nuestros graduados destacados.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Overlay de bloqueo si no está autenticado */}
          {!isAuthenticated && (
            <div className="absolute inset-0 z-10 rounded-2xl flex flex-col items-center justify-center" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(4px)' }}>
              <div className="bg-white rounded-2xl p-10 text-center max-w-sm" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                <div className="bg-primary p-4 rounded-full inline-block mb-5">
                  <Lock size={32} className="text-secondary" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Contenido exclusivo</h4>
                <p className="text-sm text-gray-500 mb-6">
                  Inicia sesión para ver los testimonios de graduados destacados.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-primary hover:bg-secondary hover:text-primary text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 text-sm"
                >
                  Iniciar sesión
                </button>
                <p className="text-xs text-gray-400 mt-4">¿Eres graduado? Solicita tu acceso al coordinador.</p>
              </div>
            </div>
          )}

          {/* Carrusel de testimonios */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonios.map((t) => (
                <div key={t.id} className="min-w-full bg-gradient-to-br from-primary to-primary-dark p-6 md:p-8">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-black" onClick={() => fetch(`${API_URL}/recursos/click`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ recurso_id: `testimonio-${t.id}`, tipo: 'enlace' }) }).catch(() => {})}>
                    <iframe
                      src={getEmbedUrl(t.youtube_url)}
                      className="w-full h-full"
                      allowFullScreen
                      title={t.titulo}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t.titulo}</h3>
                  {t.nombre_egresado && (
                    <p className="text-secondary font-medium text-sm">{t.nombre_egresado} {t.cargo ? `— ${t.cargo}` : ''}</p>
                  )}
                  {t.descripcion && <p className="text-white/70 text-sm mt-2">{t.descripcion}</p>}
                </div>
              ))}
            </div>

            {/* Controles */}
            {testimonios.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300" aria-label="Anterior">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300" aria-label="Siguiente">
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {testimonios.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current ? 'bg-secondary w-8' : 'bg-white/40 hover:bg-white/60'}`} aria-label={`Ir a slide ${i + 1}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
