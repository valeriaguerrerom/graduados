import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Star } from 'lucide-react';
import { API_URL } from '../config';

const SatisfactionSurveyPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // Empezar en 0 para pedir cédula
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Identificación
    cedula: '',
    
    // Preguntas con escala 1-5
    calidad_academica: 0,
    pertinencia_contenidos: 0,
    nivel_docentes: 0,
    aplicabilidad_conocimientos: 0,
    acompanamiento_institucional: 0,
    cumplimiento_expectativas: 0,
    satisfaccion_general: 0,
    
    // Preguntas cortas
    aspecto_mas_valorado: '',
    aspecto_mejorar: '',
    recomendaria: ''
  });

  const handleRatingChange = (field: string, value: number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/encuesta-satisfaccion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Error al guardar la encuesta');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const validateStep0 = () => {
    return formData.cedula.trim() !== '';
  };

  const validateStep1 = () => {
    return formData.calidad_academica > 0 &&
           formData.pertinencia_contenidos > 0 &&
           formData.nivel_docentes > 0 &&
           formData.aplicabilidad_conocimientos > 0 &&
           formData.acompanamiento_institucional > 0 &&
           formData.cumplimiento_expectativas > 0 &&
           formData.satisfaccion_general > 0;
  };

  const validateStep2 = () => {
    return formData.aspecto_mas_valorado.trim() !== '' &&
           formData.aspecto_mejorar.trim() !== '' &&
           formData.recomendaria !== '';
  };

  const nextStep = async () => {
    if (currentStep === 0 && validateStep0()) {
      // Verificar si ya completó la encuesta
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_URL}/encuesta-satisfaccion/verificar/${formData.cedula.trim()}`);
        if (!res.ok) {
          setError('Error al verificar. Intenta de nuevo.');
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.noExiste) {
          setError('No se encontró un usuario con esa cédula. Verifica que seas graduado registrado.');
          setLoading(false);
          return;
        }
        if (data.yaCompletada) {
          setError('Ya completaste la encuesta de satisfacción. Puedes iniciar sesión directamente.');
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error verificando:', err);
        setError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
        setLoading(false);
        return;
      }
      setLoading(false);
      setCurrentStep(1);
    } else if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const RatingStars = ({ field, value }: { field: string; value: number }) => {
    return (
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleRatingChange(field, rating)}
            className={`transition-all duration-200 ${
              rating <= value ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
          >
            <Star size={32} fill={rating <= value ? 'currentColor' : 'none'} />
          </button>
        ))}
        <span className="ml-4 text-sm font-medium text-gray-600">
          {value === 0 ? 'Sin calificar' : 
           value === 1 ? '1️⃣ Muy insatisfecho' :
           value === 2 ? '2️⃣ Insatisfecho' :
           value === 3 ? '3️⃣ Neutral' :
           value === 4 ? '4️⃣ Satisfecho' :
           '5️⃣ Muy satisfecho'}
        </span>
      </div>
    );
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">¡Gracias por tu opinión!</h2>
          <p className="text-gray-600 mb-6">
            Tu encuesta ha sido registrada exitosamente. Ahora puedes iniciar sesión.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Redirigiendo al inicio de sesión...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            ENCUESTA DE SATISFACCIÓN
          </h1>
          <p className="text-gray-600">
            Egresados – Especialización en Sistemas Integrados de Gestión (ESIG)
          </p>
          <p className="text-gray-600">Universidad Mariana</p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              Por favor, complete esta breve encuesta antes de registrarse en la plataforma
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`text-sm font-medium ${currentStep === 0 ? 'text-primary' : 'text-gray-400'}`}>
              Paso 1: Identificación
            </span>
            <span className={`text-sm font-medium ${currentStep === 1 ? 'text-primary' : 'text-gray-400'}`}>
              Paso 2: Calificaciones
            </span>
            <span className={`text-sm font-medium ${currentStep === 2 ? 'text-primary' : 'text-gray-400'}`}>
              Paso 3: Comentarios
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* PASO 0: Identificación */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-primary mb-2">Bienvenido</h2>
                  <p className="text-gray-600">
                    Por favor, ingresa tu número de cédula para comenzar la encuesta
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Cédula <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg"
                    placeholder="Ej: 1234567890"
                  />
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-blue-700">
                    <strong>Nota:</strong> Debes ser graduado registrado en el sistema para completar esta encuesta.
                  </p>
                </div>
              </div>
            )}

            {/* PASO 1: Preguntas con escala */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Escala de valoración:</strong><br />
                    1️⃣ Muy insatisfecho | 2️⃣ Insatisfecho | 3️⃣ Neutral | 4️⃣ Satisfecho | 5️⃣ Muy satisfecho
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    1. ¿Qué tan satisfecho(a) está con la calidad académica del programa?
                  </label>
                  <RatingStars field="calidad_academica" value={formData.calidad_academica} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    2. ¿Qué tan pertinentes fueron los contenidos frente a su ejercicio profesional?
                  </label>
                  <RatingStars field="pertinencia_contenidos" value={formData.pertinencia_contenidos} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    3. ¿Cómo califica el nivel y dominio de los docentes?
                  </label>
                  <RatingStars field="nivel_docentes" value={formData.nivel_docentes} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    4. ¿Qué tan aplicables han sido los conocimientos en su trabajo?
                  </label>
                  <RatingStars field="aplicabilidad_conocimientos" value={formData.aplicabilidad_conocimientos} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    5. ¿Qué tan satisfecho(a) estuvo con el acompañamiento institucional?
                  </label>
                  <RatingStars field="acompanamiento_institucional" value={formData.acompanamiento_institucional} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    6. ¿El programa cumplió sus expectativas iniciales?
                  </label>
                  <RatingStars field="cumplimiento_expectativas" value={formData.cumplimiento_expectativas} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    7. En general, ¿qué tan satisfecho(a) está con la Especialización ESIG?
                  </label>
                  <RatingStars field="satisfaccion_general" value={formData.satisfaccion_general} />
                </div>

                {!validateStep1() && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="text-sm text-yellow-700">
                      Por favor, califique todas las preguntas antes de continuar
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* PASO 2: Preguntas cortas */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    8. ¿Qué fue lo que más valora del programa? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="aspecto_mas_valorado"
                    value={formData.aspecto_mas_valorado}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Escriba su respuesta..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    9. ¿Qué aspecto considera que debería mejorarse? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="aspecto_mejorar"
                    value={formData.aspecto_mejorar}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Escriba su respuesta..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    10. ¿Recomendaría la especialización? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="recomendaria"
                    value={formData.recomendaria}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Seleccione...</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                    <option value="Tal vez">Tal vez</option>
                  </select>
                </div>
              </div>
            )}

            {/* Navegación */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep === 0 ? (
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Anterior
                </button>
              )}

              {currentStep === 0 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep0()}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              ) : currentStep === 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep1()}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!validateStep2() || loading}
                  className="flex items-center px-6 py-3 bg-secondary text-primary rounded-lg font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={20} className="mr-2" />
                  {loading ? 'Guardando...' : 'Finalizar Encuesta'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionSurveyPage;

