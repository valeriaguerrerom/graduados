import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const CompleteProfilePageExtended: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Datos básicos
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    
    // Datos socioeconómicos y demográficos
    fecha_nacimiento: '',
    sexo: '',
    estado_civil: '',
    pais: 'Colombia',
    departamento: '',
    municipio: '',
    direccion_correspondencia: '',
    
    // Información académica
    programa: user?.programa || '',
    año_graduacion: user?.añoGraduacion || '',
    fec_grado: '',
    modalidad: '',
    
    // Estudios adicionales
    postgrados_salud: false,
    diplomados_actualizacion: false,
    cursos_sena: false,
    ningun_estudio_adicional: false,
    
    // Idiomas
    habla_otro_idioma: false,
    cual_idioma: '',
    
    // Situación laboral actual
    condicion_laboral: '',
    ciudad_trabajo: '',
    tiempo_experiencia: '',
    
    // Primer empleo
    lugar_residencia_primer_empleo: '',
    acceso_primer_empleo: '',
    medio_obtencion_empleo: '',
    
    // Empleo actual
    labora_actualmente_en: '',
    ingreso_mensual: '',
    dificultad_conseguir_trabajo: '',
    otra_dificultad: '',
    area_desempeno: '',
    
    // Trayectoria profesional
    cantidad_empleos: '',
    
    // Reconocimiento profesional
    ha_recibido_reconocimiento: false,
    tipo_reconocimiento: '',
    otro_reconocimiento: '',
    
    // Participación en redes
    participa_redes: '',
    tipo_red: '',
    
    // Producción académica
    libros_publicados: false,
    capitulos_libros: false,
    patentes: false,
    politicas_publicas: false,
    ninguna_produccion: false,
    
    // Experiencia internacional
    estuvo_exterior_estudio: false,
    pais_estudio: '',
    estuvo_exterior_trabajo: false,
    pais_trabajo: '',
    tiempo_exterior_trabajo: '',
    area_desempeno_exterior: '',
    otra_area_exterior: '',
    
    // Cursos y seminarios
    donde_realizar_estudios: '',
    cursaria_estudios_unimar: '',
    tipo_formacion_futura: '',
    aspecto_mejorar: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await updateProfile(formData);
      if (success) {
        navigate('/');
      } else {
        setError('Error al actualizar el perfil. Por favor, intenta de nuevo.');
      }
    } catch (err) {
      setError('Error al actualizar el perfil. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    'Datos Personales',
    'Información Académica',
    'Situación Laboral',
    'Primer Empleo',
    'Trayectoria Profesional',
    'Reconocimientos y Redes',
    'Experiencia Internacional',
    'Formación Futura'
  ];

  if (user?.hasCompletedProfile) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Completa tu Perfil de Egresado</h1>
          <p className="text-gray-600">
            Encuesta de Seguimiento a Egresados - Universidad Mariana
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs font-medium ${
                  index + 1 === currentStep
                    ? 'text-primary'
                    : index + 1 < currentStep
                    ? 'text-secondary'
                    : 'text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-sm font-medium text-gray-700">
            Paso {currentStep} de {steps.length}: {steps[currentStep - 1]}
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* PASO 1: Datos Personales */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  DATOS SOCIOECONÓMICOS Y DEMOGRÁFICOS
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      required
                      value={formData.apellido}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de nacimiento *
                    </label>
                    <input
                      type="date"
                      name="fecha_nacimiento"
                      required
                      value={formData.fecha_nacimiento}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sexo *
                    </label>
                    <select
                      name="sexo"
                      required
                      value={formData.sexo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estado civil *
                    </label>
                    <select
                      name="estado_civil"
                      required
                      value={formData.estado_civil}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Soltero">Soltero</option>
                      <option value="Casado/unión libre">Casado/unión libre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Departamento *
                    </label>
                    <input
                      type="text"
                      name="departamento"
                      required
                      value={formData.departamento}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Municipio *
                    </label>
                    <input
                      type="text"
                      name="municipio"
                      required
                      value={formData.municipio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dirección de correspondencia *
                    </label>
                    <input
                      type="text"
                      name="direccion_correspondencia"
                      required
                      value={formData.direccion_correspondencia}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navegación */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft size={20} className="mr-2" />
                Anterior
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors"
                >
                  Siguiente
                  <ChevronRight size={20} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-secondary text-primary rounded-lg font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50"
                >
                  <CheckCircle size={20} className="mr-2" />
                  {loading ? 'Guardando...' : 'Finalizar'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePageExtended;
