import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import Card, { CardBody, CardFooter } from '../components/ui/Card';
import { ExternalLink, Download, CheckCircle, FolderOpen } from 'lucide-react';

import { API_URL } from '../config';

const registrarClick = async (recursoId: string, tipo: 'descarga' | 'enlace') => {
  try {
    await fetch(`${API_URL}/recursos/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recurso_id: recursoId, tipo }),
    });
  } catch (err) {
    console.error('Error registrando click:', err);
  }
};

interface Recurso {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  tipo: 'enlace' | 'descarga';
  url: string;
  imagen_url: string;
}

const ResourcesPage: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState<number | null>(null);
  const [filterCat, setFilterCat] = useState<string>('');

  useEffect(() => {
    fetch(`${API_URL}/recursos`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { if (Array.isArray(data)) setRecursos(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (recurso: Recurso) => {
    registrarClick(`recurso-${recurso.id}-${recurso.titulo}`, recurso.tipo);
    setClicked(recurso.id);
    window.open(recurso.url, '_blank');
    setTimeout(() => setClicked(null), 2000);
  };

  const categorias = [...new Set(recursos.map(r => r.categoria))];
  const filtered = filterCat ? recursos.filter(r => r.categoria === filterCat) : recursos;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <Section
        title="Recursos y Herramientas"
        subtitle="Accede a recursos exclusivos diseñados para impulsar tu desarrollo profesional."
        titleCenter
      >
        {/* Filtro por categoría */}
        {categorias.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setFilterCat('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!filterCat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Todos
            </button>
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterCat === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((recurso) => (
              <Card key={recurso.id} hover className="h-full">
                <div className="h-48 overflow-hidden relative">
                  {recurso.imagen_url ? (
                    <img
                      src={recurso.imagen_url}
                      alt={recurso.titulo}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <FolderOpen size={48} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <CardBody>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {recurso.categoria}
                    </span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${recurso.tipo === 'descarga' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                      {recurso.tipo === 'descarga' ? 'Descarga' : 'Enlace'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{recurso.titulo}</h3>
                  <p className="text-gray-600 text-sm">{recurso.descripcion}</p>
                </CardBody>
                <CardFooter>
                  <button
                    onClick={() => handleClick(recurso)}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                  >
                    {clicked === recurso.id ? (
                      <><CheckCircle size={16} /> Abierto</>
                    ) : recurso.tipo === 'descarga' ? (
                      <><Download size={16} /> Descargar</>
                    ) : (
                      <><ExternalLink size={16} /> Visitar</>
                    )}
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FolderOpen size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">No hay recursos disponibles en este momento.</p>
          </div>
        )}
      </Section>
    </div>
  );
};

export default ResourcesPage;
