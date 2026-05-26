import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import { Search, User, Mail, Phone, MapPin, Building, Briefcase, Users, GraduationCap } from 'lucide-react';

import { API_URL } from '../config';

interface Egresado {
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  programa: string;
  año_graduacion: string;
  condicion_laboral: string;
  ciudad_trabajo: string;
  labora_actualmente_en: string;
  otra_labor: string;
  area_desempeno: string;
  otra_area_desempeno: string;
  foto_url: string;
}

interface Empresa {
  nombre: string;
  ubicacion: string;
  cantidad_egresados: number;
  areas: string;
}

const DirectoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'egresados' | 'empresas'>('egresados');
  const [egresados, setEgresados] = useState<Egresado[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [egRes, empRes] = await Promise.all([
        fetch(`${API_URL}/directorio/egresados`),
        fetch(`${API_URL}/directorio/empresas`)
      ]);
      setEgresados(await egRes.json());
      setEmpresas(await empRes.json());
    } catch (err) {
      console.error('Error cargando directorio:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEgresados = egresados.filter(e => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      e.nombre?.toLowerCase().includes(term) ||
      e.apellido?.toLowerCase().includes(term) ||
      e.email?.toLowerCase().includes(term) ||
      e.cedula?.includes(term) ||
      e.programa?.toLowerCase().includes(term) ||
      e.ciudad_trabajo?.toLowerCase().includes(term) ||
      e.labora_actualmente_en?.toLowerCase().includes(term)
    );
  });

  const filteredEmpresas = empresas.filter(emp => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      emp.nombre?.toLowerCase().includes(term) ||
      emp.ubicacion?.toLowerCase().includes(term) ||
      emp.areas?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando directorio...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Section
        title="Directorio"
        subtitle="Conecta con otros graduados y conoce las empresas donde trabajan los profesionales de nuestra comunidad."
        titleCenter
      >
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg shadow p-1 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('egresados')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'egresados' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users size={16} />Egresados
          </button>
          <button
            onClick={() => setActiveTab('empresas')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'empresas' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Building size={16} />Empresas
          </button>
        </div>

        {/* Buscador */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={activeTab === 'egresados' ? 'Buscar por nombre, cédula, programa, ciudad...' : 'Buscar por nombre de empresa, ubicación, área...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Tab: Egresados */}
        {activeTab === 'egresados' && (
          <>
            <p className="text-sm text-gray-500 text-center mb-6">{filteredEgresados.length} graduados encontrados</p>
            {filteredEgresados.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEgresados.map((eg) => (
                  <div key={eg.cedula} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {eg.foto_url ? (
                          <img src={eg.foto_url} alt={eg.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <User size={24} className="text-primary" />
                        )}
                      </div>
                      <div className="ml-4 min-w-0">
                        <h3 className="font-semibold text-primary truncate">{eg.nombre} {eg.apellido}</h3>
                        {eg.programa && (
                          <p className="text-xs text-gray-500 truncate">{eg.programa}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      {eg.email && (
                        <div className="flex items-center text-gray-600">
                          <Mail size={14} className="mr-2 text-secondary flex-shrink-0" />
                          <a href={`mailto:${eg.email}`} className="hover:text-primary truncate">{eg.email}</a>
                        </div>
                      )}
                      {eg.telefono && (
                        <div className="flex items-center text-gray-600">
                          <Phone size={14} className="mr-2 text-secondary flex-shrink-0" />
                          <span>{eg.telefono}</span>
                        </div>
                      )}
                      {eg.ciudad_trabajo && (
                        <div className="flex items-center text-gray-600">
                          <MapPin size={14} className="mr-2 text-secondary flex-shrink-0" />
                          <span>{eg.ciudad_trabajo}</span>
                        </div>
                      )}
                      {eg.labora_actualmente_en && (
                        <div className="flex items-center text-gray-600">
                          <Briefcase size={14} className="mr-2 text-secondary flex-shrink-0" />
                          <span className="truncate">{eg.labora_actualmente_en === 'Otro' && eg.otra_labor ? eg.otra_labor : eg.labora_actualmente_en}</span>
                        </div>
                      )}
                      {eg.año_graduacion && (
                        <div className="flex items-center text-gray-600">
                          <GraduationCap size={14} className="mr-2 text-secondary flex-shrink-0" />
                          <span>Graduado: {eg.año_graduacion}</span>
                        </div>
                      )}
                    </div>

                    {(eg.condicion_laboral || eg.area_desempeno) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {eg.condicion_laboral && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {eg.condicion_laboral}
                          </span>
                        )}
                        {eg.area_desempeno && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {eg.area_desempeno === 'Otro' && eg.otra_area_desempeno ? eg.otra_area_desempeno : eg.area_desempeno}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">No se encontraron egresados con ese criterio de búsqueda.</p>
              </div>
            )}
          </>
        )}

        {/* Tab: Empresas */}
        {activeTab === 'empresas' && (
          <>
            <p className="text-sm text-gray-500 text-center mb-6">{filteredEmpresas.length} empresas encontradas</p>
            {filteredEmpresas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmpresas.map((emp, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Building size={24} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-primary">{emp.nombre}</h3>
                          {emp.ubicacion && (
                            <div className="flex items-center text-sm text-gray-500 mt-0.5">
                              <MapPin size={12} className="mr-1" />
                              <span>{emp.ubicacion}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-secondary" />
                        <span className="text-sm text-gray-700">
                          <strong className="text-primary">{emp.cantidad_egresados}</strong> egresado{emp.cantidad_egresados > 1 ? 's' : ''} vinculado{emp.cantidad_egresados > 1 ? 's' : ''}
                        </span>
                      </div>

                      {emp.areas && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">Áreas de desempeño:</p>
                          <div className="flex flex-wrap gap-1">
                            {emp.areas.split(', ').filter(Boolean).map((area, i) => (
                              <span key={i} className="inline-block px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">No se encontraron empresas con ese criterio de búsqueda.</p>
              </div>
            )}
          </>
        )}
      </Section>
    </div>
  );
};

export default DirectoryPage;
