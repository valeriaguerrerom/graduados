import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import { Calendar, Clock, MapPin, Award, Bell, Handshake, Send, Search, Mail, Heart, HelpCircle, Trash2, User } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

import { API_URL } from '../config';

interface TarjetaNetworking {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  programa: string;
  rol_profesional: string;
  que_ofrece: string;
  que_necesita: string;
  foto_url: string;
}

const NetworkingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [eventos, setEventos] = useState<any[]>([]);
  const [tarjetas, setTarjetas] = useState<TarjetaNetworking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ rol_profesional: '', que_ofrece: '', que_necesita: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchTarjetas();
    fetch(`${API_URL}/eventos`).then(r => r.json()).then(setEventos).catch(() => {});
  }, []);

  const fetchTarjetas = async () => {
    try {
      const res = await fetch(`${API_URL}/networking`);
      const data = await res.json();
      setTarjetas(data);
    } catch (err) {
      console.error('Error cargando tablero:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch(`${API_URL}/networking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula: user.cedula, ...formData }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Tarjeta publicada');
        setShowForm(false);
        setFormData({ rol_profesional: '', que_ofrece: '', que_necesita: '' });
        fetchTarjetas();
      } else {
        setMsg(data.message || 'Error al publicar');
      }
    } catch { setMsg('Error de conexión'); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!user || !window.confirm('¿Eliminar tu tarjeta del tablero?')) return;
    try {
      await fetch(`${API_URL}/networking/${user.cedula}`, { method: 'DELETE' });
      fetchTarjetas();
    } catch (err) { console.error(err); }
  };

  const filtered = tarjetas.filter(t =>
    !searchTerm ||
    t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.rol_profesional.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.que_ofrece.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.que_necesita.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const myCard = tarjetas.find(t => t.cedula === user?.cedula);

  return (
    <div>
      {/* Eventos */}
      <Section
        title="Eventos y Formación"
        subtitle="Programas de formación continua para graduados de la Especialización en SIG."
        titleCenter
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <Card key={evento.id} hover className="h-full">
              <div className="h-48 overflow-hidden">
                {evento.imagen_url ? (
                  <img src={evento.imagen_url} alt={evento.titulo} className="w-full h-full object-cover transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center"><Calendar size={48} className="text-gray-300" /></div>
                )}
              </div>
              <CardBody>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${evento.tipo_color || 'bg-blue-100 text-blue-800'}`}>{evento.tipo}</span>
                  {evento.costo === 'Gratuito' && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Gratuito</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2 leading-tight">{evento.titulo}</h3>
                <p className="text-gray-600 mb-4 text-sm">{evento.descripcion}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center"><Calendar size={16} className="mr-2 text-secondary flex-shrink-0" /><span>{evento.fecha}</span></div>
                  <div className="flex items-center"><Clock size={16} className="mr-2 text-secondary flex-shrink-0" /><span>{evento.duracion}</span></div>
                  <div className="flex items-center"><MapPin size={16} className="mr-2 text-secondary flex-shrink-0" /><span>{evento.modalidad}</span></div>
                  <div className="flex items-center"><Award size={16} className="mr-2 text-secondary flex-shrink-0" /><span>Certificado: {evento.certificado}</span></div>
                </div>
              </CardBody>
              <CardFooter>
                {(evento.enlace_inscripcion || evento.titulo?.toLowerCase().includes('power bi')) ? (
                  <a 
                    href={evento.enlace_inscripcion || 'https://forms.gle/4RkY6WpUHh5DSPn28'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => fetch(`${API_URL}/recursos/click`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ recurso_id: `evento-${evento.titulo}`, tipo: 'enlace' }) }).catch(() => {})}
                    className="w-full flex items-center justify-center gap-2 bg-secondary text-primary font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-secondary-dark transition-colors"
                  >
                    <Bell size={14} />¡Inscríbete ahora!
                  </a>
                ) : (
                  <div className="w-full flex items-center justify-center gap-2 bg-secondary/10 text-secondary font-semibold px-4 py-2.5 rounded-lg text-sm">
                    <Bell size={14} />Inscripciones proximamente
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* Tablero de Networking */}
      <Section
        title="Tablero de Networking"
        subtitle="Conecta con otros graduados: comparte lo que ofreces y encuentra lo que necesitas."
        titleCenter
      >
        {/* Botón publicar + buscador */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, rol, oferta o necesidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          {isAuthenticated && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-5 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              <Handshake size={18} />
              {myCard ? 'Editar mi tarjeta' : 'Publicar mi tarjeta'}
            </button>
          )}
        </div>

        {/* Formulario */}
        {showForm && isAuthenticated && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-primary/20">
            <h3 className="text-lg font-bold text-primary mb-4">
              <Handshake size={20} className="inline mr-2" />
              {myCard ? 'Editar mi tarjeta' : 'Crear mi tarjeta de networking'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">¿Cuál es tu rol profesional?</label>
                <input
                  type="text"
                  required
                  value={formData.rol_profesional}
                  onChange={(e) => setFormData({ ...formData, rol_profesional: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ej: Consultor en SIG, Auditor de calidad..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">¿Qué puedes ofrecer?</label>
                <textarea
                  required
                  value={formData.que_ofrece}
                  onChange={(e) => setFormData({ ...formData, que_ofrece: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={2}
                  placeholder="Ej: Mentoría en ISO 9001, contactos en el sector salud..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">¿Qué necesitas?</label>
                <textarea
                  required
                  value={formData.que_necesita}
                  onChange={(e) => setFormData({ ...formData, que_necesita: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={2}
                  placeholder="Ej: Socio para emprendimiento, asesoría en auditorías..."
                />
              </div>
              {msg && <p className="text-sm text-green-600 font-medium">{msg}</p>}
              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50">
                  <Send size={16} />{loading ? 'Publicando...' : 'Publicar'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tarjetas */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <div key={t.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {t.foto_url ? (
                        <img src={t.foto_url} alt={t.nombre} className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{t.nombre} {t.apellido}</h4>
                      <p className="text-sm text-gray-500">{t.rol_profesional}</p>
                    </div>
                  </div>
                  {t.cedula === user?.cedula && (
                    <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 transition-colors" title="Eliminar mi tarjeta">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 mb-1">
                      <Heart size={12} />Ofrece
                    </div>
                    <p className="text-sm text-gray-600">{t.que_ofrece}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-1">
                      <HelpCircle size={12} />Necesita
                    </div>
                    <p className="text-sm text-gray-600">{t.que_necesita}</p>
                  </div>
                </div>

                <a
                  href={`mailto:${t.email}?subject=Networking ESIG - Contacto`}
                  onClick={() => fetch(`${API_URL}/recursos/click`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ recurso_id: `networking-${t.cedula}`, tipo: 'enlace' }) }).catch(() => {})}
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 rounded-lg transition-colors text-sm"
                >
                  <Mail size={14} />Contactar
                </a>
                <p className="text-xs text-gray-400 text-center mt-1">{t.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Handshake size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">Aún no hay tarjetas publicadas. ¡Sé el primero!</p>
          </div>
        )}
      </Section>
    </div>
  );
};

export default NetworkingPage;

