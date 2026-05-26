import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, Award, Globe } from 'lucide-react';
import { API_URL } from '../config';

interface EgresadoDetalle {
  // Datos básicos
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  sexo: string;
  estado_civil: string;
  
  // Ubicación
  pais: string;
  departamento: string;
  municipio: string;
  direccion_correspondencia: string;
  
  // Académico
  programa: string;
  año_graduacion: string;
  modalidad: string;
  
  // Laboral
  condicion_laboral: string;
  ciudad_trabajo: string;
  tiempo_experiencia: string;
  area_desempeno: string;
  ingreso_mensual: string;
}

const LeaderViewProfilePage: React.FC = () => {
  const { cedula } = useParams<{ cedula: string }>();
  const navigate = useNavigate();
  const [egresado, setEgresado] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Resolver campos "Otro" mostrando el valor especificado
  const resolveOtro = (value: any, otroValue: any) => {
    if (!value) return 'No especificado';
    if (value === 'Otro' && otroValue) return otroValue;
    return value;
  };

  useEffect(() => {
    fetchEgresadoDetail();
  }, [cedula]);

  const fetchEgresadoDetail = async () => {
    try {
      const response = await fetch(`${API_URL}/leader/egresado/${cedula}`);
      const data = await response.json();
      setEgresado(data);
    } catch (error) {
      console.error('Error al cargar egresado:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!egresado) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-gray-600">Graduado no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/leader/dashboard')}
          className="flex items-center text-primary hover:text-primary-light mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center mb-6">
            <div className="bg-primary rounded-full p-4 mr-4 overflow-hidden w-16 h-16 flex items-center justify-center flex-shrink-0">
              {egresado.foto_url ? (
                <img src={egresado.foto_url} alt={egresado.nombre} className="w-full h-full object-cover rounded-full" />
              ) : (
                <User className="text-white" size={32} />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {egresado.nombre} {egresado.apellido}
              </h1>
              <p className="text-gray-600">Cédula: {egresado.cedula}</p>
            </div>
          </div>

          {/* Datos Personales */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
              <User size={20} className="mr-2" />
              Información Personal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{egresado.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium">{egresado.telefono || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Nacimiento</p>
                <p className="font-medium">{egresado.fecha_nacimiento || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sexo</p>
                <p className="font-medium">{egresado.sexo || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado Civil</p>
                <p className="font-medium">{egresado.estado_civil || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ciudad</p>
                <p className="font-medium">{egresado.municipio}, {egresado.departamento}</p>
              </div>
            </div>
          </div>

          {/* Información Académica */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Award size={20} className="mr-2" />
              Información Académica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Programa</p>
                <p className="font-medium">{egresado.programa || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Año de Graduación</p>
                <p className="font-medium">{egresado.año_graduacion || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Modalidad</p>
                <p className="font-medium">{egresado.modalidad || 'No especificado'}</p>
              </div>
            </div>
          </div>

          {/* Información Laboral */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Briefcase size={20} className="mr-2" />
              Situación Laboral
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Condición Laboral</p>
                <p className="font-medium">{egresado.condicion_laboral || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ciudad de Trabajo</p>
                <p className="font-medium">{egresado.ciudad_trabajo || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tiempo de Experiencia</p>
                <p className="font-medium">{egresado.tiempo_experiencia || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Área de Desempeño</p>
                <p className="font-medium">{resolveOtro(egresado.area_desempeno, egresado.otra_area_desempeno)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ingreso Mensual</p>
                <p className="font-medium">{egresado.ingreso_mensual || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Labora actualmente en</p>
                <p className="font-medium">{resolveOtro(egresado.labora_actualmente_en, egresado.otra_labor)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderViewProfilePage;
