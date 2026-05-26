import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import Card, { CardBody, CardFooter } from '../components/ui/Card';
import { Search, MapPin, DollarSign, Mail, ExternalLink, Briefcase, Clock, FileText, X, ZoomIn } from 'lucide-react';

import { API_URL as API } from '../config';

const registrarClick = async (id: string) => {
  try {
    await fetch(`${API}/recursos/click`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recurso_id: `empleo-${id}`, tipo: 'enlace' }),
    });
  } catch {}
};

const timeAgo = (date: string): string => {
  const now = new Date();
  const d = new Date(date);
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Hace 1 dia';
  if (diff < 7) return `Hace ${diff} dias`;
  if (diff < 30) return `Hace ${Math.floor(diff / 7)} semana${Math.floor(diff / 7) > 1 ? 's' : ''}`;
  return `Hace ${Math.floor(diff / 30)} mes${Math.floor(diff / 30) > 1 ? 'es' : ''}`;
};

const JobsPage: React.FC = () => {
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 6;

  useEffect(() => {
    fetch(`${API}/empleos`)
      .then(r => r.json())
      .then(data => setOfertas(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { setPage(1); }, [searchTerm]);

  const filtered = ofertas.filter(o => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return o.titulo?.toLowerCase().includes(s) || o.empresa?.toLowerCase().includes(s) || o.ubicacion?.toLowerCase().includes(s) || o.descripcion?.toLowerCase().includes(s);
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div>
      <Section title="Ofertas Laborales" subtitle="Explora oportunidades laborales exclusivas para graduados de la Universidad Mariana." titleCenter>
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input type="text" placeholder="Buscar por cargo, empresa, ciudad..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((oferta) => (
            <Card key={oferta.id} hover className="h-full">
              <div
                className={`h-48 overflow-hidden relative ${oferta.imagen_url ? 'cursor-pointer' : ''}`}
                onClick={() => oferta.imagen_url && setZoomImg(oferta.imagen_url)}
              >
                {oferta.imagen_url ? (
                  <img src={oferta.imagen_url} alt={oferta.titulo}
                    className={`w-full h-full ${oferta.es_imagen ? 'object-contain bg-white' : 'object-cover'} transition-transform duration-300`} />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Briefcase size={48} className="text-gray-300" />
                  </div>
                )}
                {oferta.fijada && (
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-secondary text-white shadow">Destacada</span>
                  </div>
                )}
                {oferta.imagen_url && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white p-1.5 rounded-full"><ZoomIn size={14} /></div>
                )}
              </div>

              <CardBody>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{oferta.tipo}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={12} />{timeAgo(oferta.created_at)}</span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1 leading-tight">{oferta.titulo}</h3>
                <p className="text-sm text-gray-500 font-medium mb-2">{oferta.empresa || ''}</p>
                {oferta.descripcion && <p className="text-sm text-gray-600 mb-3">{oferta.descripcion}</p>}
                <div className="space-y-1 text-sm text-gray-500">
                  {oferta.ubicacion && <div className="flex items-center gap-1"><MapPin size={14} className="text-secondary" />{oferta.ubicacion}</div>}
                  {oferta.salario && <div className="flex items-center gap-1"><DollarSign size={14} className="text-secondary" />{oferta.salario}</div>}
                </div>
              </CardBody>

              <CardFooter className="flex flex-col gap-2">
                {oferta.contacto_tipo === 'email' ? (
                  <>
                    <a href={`mailto:${oferta.contacto}?subject=Postulacion: ${oferta.titulo}`} onClick={() => registrarClick(oferta.titulo)}
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                      <Mail size={16} />Postularme
                    </a>
                    {oferta.contacto && <p className="text-xs text-gray-400 text-center">{oferta.contacto}</p>}
                  </>
                ) : (
                  <>
                    <a href={oferta.contacto} target="_blank" rel="noopener noreferrer" onClick={() => registrarClick(oferta.titulo)}
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                      <ExternalLink size={16} />Inscribirme
                    </a>
                    {oferta.fijada && (
                      <a href="https://www.serviciodeempleo.gov.co/wp-content/uploads/2025/10/Instructivo-de-Autoregistro-en-el-Servicio-Publico-de-Empleo.pdf"
                        target="_blank" rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary font-medium py-2 rounded-lg transition-colors text-xs">
                        <FileText size={14} />Ver instructivo
                      </a>
                    )}
                  </>
                )}
              </CardFooter>
            </Card>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">No se encontraron ofertas</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === 1} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium disabled:opacity-40 transition-colors">
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                {p}
              </button>
            ))}
            <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === totalPages} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium disabled:opacity-40 transition-colors">
              Siguiente
            </button>
          </div>
        )}
      </Section>

      {zoomImg && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setZoomImg(null)}>
          <button onClick={() => setZoomImg(null)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"><X size={24} /></button>
          <img src={zoomImg} alt="Oferta" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default JobsPage;

