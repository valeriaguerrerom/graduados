import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const CompleteProfilePageFull: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Debug: verificar si el usuario está presente
  useEffect(() => {
    console.log('ðŸ” Usuario en CompleteProfilePageFull:', user);
    console.log('ðŸ” isAuthenticated:', !!user);
    
    // Si no hay usuario, intentar recuperar del localStorage
    if (!user) {
      const savedUser = sessionStorage.getItem('user');
      console.log('ðŸ” Usuario en sessionStorage:', savedUser);
    }
  }, [user]);

  const [formData, setFormData] = useState({
    // Datos básicos
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    
    // Datos socioeconómicos y demográficos
    fecha_nacimiento: user?.fecha_nacimiento || '',
    sexo: user?.sexo || '',
    estado_civil: user?.estado_civil || '',
    pais: user?.pais || 'Colombia',
    departamento: user?.departamento || '',
    municipio: user?.municipio || '',
    direccion_correspondencia: user?.direccion_correspondencia || '',
    
    // Información académica
    programa: user?.programa || '',
    año_graduacion: user?.añoGraduacion || user?.año_graduacion || '',
    fec_grado: user?.fec_grado || '',
    modalidad: user?.modalidad || '',
    
    // Estudios adicionales
    postgrados_salud: user?.postgrados_salud || false,
    diplomados_actualizacion: user?.diplomados_actualizacion || false,
    cursos_sena: user?.cursos_sena || false,
    ningun_estudio_adicional: user?.ningun_estudio_adicional || false,
    estudios_adicionales: (user as any)?.estudios_adicionales || '',
    
    // Idiomas
    habla_otro_idioma: user?.habla_otro_idioma || false,
    cual_idioma: user?.cual_idioma || '',
    
    // Situación laboral actual
    condicion_laboral: user?.condicion_laboral || '',
    ciudad_trabajo: user?.ciudad_trabajo || '',
    tiempo_experiencia: user?.tiempo_experiencia || '',
    
    // Primer empleo
    lugar_residencia_primer_empleo: user?.lugar_residencia_primer_empleo || '',
    acceso_primer_empleo: user?.acceso_primer_empleo || '',
    medio_obtencion_empleo: user?.medio_obtencion_empleo || '',
    
    // Empleo actual
    labora_actualmente_en: user?.labora_actualmente_en || '',
    ingreso_mensual: user?.ingreso_mensual || '',
    dificultad_conseguir_trabajo: user?.dificultad_conseguir_trabajo || '',
    otra_dificultad: user?.otra_dificultad || '',
    area_desempeno: user?.area_desempeno || '',
    
    // Trayectoria profesional
    cantidad_empleos: user?.cantidad_empleos || '',
    
    // Reconocimiento profesional
    ha_recibido_reconocimiento: user?.ha_recibido_reconocimiento || false,
    tipo_reconocimiento: user?.tipo_reconocimiento || '',
    otro_reconocimiento: user?.otro_reconocimiento || '',
    
    // Participación en redes
    participa_redes: user?.participa_redes || '',
    tipo_red: user?.tipo_red || '',
    
    // Producción académica
    libros_publicados: user?.libros_publicados || false,
    capitulos_libros: user?.capitulos_libros || false,
    patentes: user?.patentes || false,
    politicas_publicas: user?.politicas_publicas || false,
    ninguna_produccion: user?.ninguna_produccion || false,
    
    // Experiencia internacional
    estuvo_exterior_estudio: user?.estuvo_exterior_estudio || false,
    pais_estudio: user?.pais_estudio || '',
    estuvo_exterior_trabajo: user?.estuvo_exterior_trabajo || false,
    pais_trabajo: user?.pais_trabajo || '',
    tiempo_exterior_trabajo: user?.tiempo_exterior_trabajo || '',
    area_desempeno_exterior: user?.area_desempeno_exterior || '',
    otra_area_exterior: user?.otra_area_exterior || '',
    
    // Cursos y seminarios
    donde_realizar_estudios: user?.donde_realizar_estudios || '',
    cursaria_estudios_unimar: user?.cursaria_estudios_unimar || '',
    tipo_formacion_futura: user?.tipo_formacion_futura || '',
    aspecto_mejorar: user?.aspecto_mejorar || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;

      if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;

        // Logica de exclusion: "Ninguna produccion" vs las otras
        if (name === 'ninguna_produccion' && checked) {
          setFormData({ ...formData, ninguna_produccion: true, libros_publicados: false, capitulos_libros: false, patentes: false, politicas_publicas: false });
          return;
        }
        if (['libros_publicados', 'capitulos_libros', 'patentes', 'politicas_publicas'].includes(name) && checked) {
          setFormData({ ...formData, [name]: true, ninguna_produccion: false });
          return;
        }

        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

  const [showSuccess, setShowSuccess] = useState(false);

  // Actualizar el formulario cuando el usuario cambie
  useEffect(() => {
    if (user) {
      setFormData({
        // Datos básicos
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || '',
        telefono: user.telefono || '',
        
        // Datos socioeconómicos y demográficos
        fecha_nacimiento: (user.fecha_nacimiento && user.fecha_nacimiento !== '0000-00-00') ? user.fecha_nacimiento : '',
        sexo: user.sexo || '',
        estado_civil: user.estado_civil || '',
        pais: user.pais || 'Colombia',
        departamento: user.departamento || '',
        municipio: user.municipio || '',
        direccion_correspondencia: user.direccion_correspondencia || '',
        
        // Información académica
        programa: user.programa || '',
        año_graduacion: (user.añoGraduacion && user.añoGraduacion !== '0000') ? user.añoGraduacion : 
                       (user.año_graduacion && user.año_graduacion !== '0000') ? user.año_graduacion : '',
        fec_grado: (user.fec_grado && user.fec_grado !== '0000-00-00') ? user.fec_grado : '',
        modalidad: user.modalidad || '',
        
        // Estudios adicionales
        postgrados_salud: user.postgrados_salud || false,
        diplomados_actualizacion: user.diplomados_actualizacion || false,
        cursos_sena: user.cursos_sena || false,
        ningun_estudio_adicional: user.ningun_estudio_adicional || false,
        estudios_adicionales: (user as any).estudios_adicionales || '',
        
        // Idiomas
        habla_otro_idioma: user.habla_otro_idioma || false,
        cual_idioma: user.cual_idioma || '',
        
        // Situación laboral actual
        condicion_laboral: user.condicion_laboral || '',
        ciudad_trabajo: user.ciudad_trabajo || '',
        tiempo_experiencia: user.tiempo_experiencia || '',
        
        // Primer empleo
        lugar_residencia_primer_empleo: user.lugar_residencia_primer_empleo || '',
        acceso_primer_empleo: user.acceso_primer_empleo || '',
        medio_obtencion_empleo: user.medio_obtencion_empleo || '',
        
        // Empleo actual
        labora_actualmente_en: user.labora_actualmente_en || '',
        ingreso_mensual: user.ingreso_mensual || '',
        dificultad_conseguir_trabajo: user.dificultad_conseguir_trabajo || '',
        otra_dificultad: user.otra_dificultad || '',
        area_desempeno: user.area_desempeno || '',
        
        // Trayectoria profesional
        cantidad_empleos: user.cantidad_empleos || '',
        
        // Reconocimiento profesional
        ha_recibido_reconocimiento: user.ha_recibido_reconocimiento || false,
        tipo_reconocimiento: user.tipo_reconocimiento || '',
        otro_reconocimiento: user.otro_reconocimiento || '',
        
        // Participación en redes
        participa_redes: user.participa_redes || '',
        tipo_red: user.tipo_red || '',
        
        // Producción académica
        libros_publicados: user.libros_publicados || false,
        capitulos_libros: user.capitulos_libros || false,
        patentes: user.patentes || false,
        politicas_publicas: user.politicas_publicas || false,
        ninguna_produccion: user.ninguna_produccion || false,
        
        // Experiencia internacional
        estuvo_exterior_estudio: user.estuvo_exterior_estudio || false,
        pais_estudio: user.pais_estudio || '',
        estuvo_exterior_trabajo: user.estuvo_exterior_trabajo || false,
        pais_trabajo: user.pais_trabajo || '',
        tiempo_exterior_trabajo: user.tiempo_exterior_trabajo || '',
        area_desempeno_exterior: user.area_desempeno_exterior || '',
        otra_area_exterior: user.otra_area_exterior || '',
        
        // Cursos y seminarios
        donde_realizar_estudios: user.donde_realizar_estudios || '',
        cursaria_estudios_unimar: user.cursaria_estudios_unimar || '',
        tipo_formacion_futura: user.tipo_formacion_futura || '',
        aspecto_mejorar: user.aspecto_mejorar || '',
      });
    }
  }, [user]);

  // Debug: verificar el estado del formData
  useEffect(() => {
    console.log('ðŸ“‹ FormData actual:', formData);
  }, [formData]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    // Validar el paso actual antes de enviar
    const stepError = validateStep(currentStep);
    if (stepError) {
      setError(stepError);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      // Convertir fechas al formato correcto para MySQL
      const dataToSend = { ...formData };
      dataToSend.programa = 'Especialización en Sistemas Integrados de Gestión';
      
      // Convertir fecha_nacimiento de ISO a YYYY-MM-DD
      if (dataToSend.fecha_nacimiento) {
        const date = new Date(dataToSend.fecha_nacimiento);
        dataToSend.fecha_nacimiento = date.toISOString().split('T')[0];
      }
      
      // Convertir fec_grado de ISO a YYYY-MM-DD
      if (dataToSend.fec_grado) {
        const date = new Date(dataToSend.fec_grado);
        dataToSend.fec_grado = date.toISOString().split('T')[0];
      }
      
      console.log('ðŸ“¤ Enviando datos del formulario:', dataToSend);
      console.log('ðŸ” aspecto_mejorar específico:', dataToSend.aspecto_mejorar);
      const success = await updateProfile(dataToSend);
      if (success) {
        console.log('✅ Perfil actualizado exitosamente');
        localStorage.removeItem('requiresUpdate');
        setShowSuccess(true);
        // Redirigir después de mostrar el mensaje de éxito
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setError('Error al actualizar el perfil. Por favor, intenta de nuevo.');
      }
    } catch (err) {
      console.error('Œ Error en handleSubmit:', err);
      setError(`Error al actualizar el perfil: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (step: number): string | null => {
    switch (step) {
      case 1: {
        const missing = [];
        if (!formData.nombre) missing.push('Nombre');
        if (!formData.apellido) missing.push('Apellido');
        if (!formData.email) missing.push('Email');
        if (!formData.telefono) missing.push('Teléfono');
        if (!formData.fecha_nacimiento) missing.push('Fecha de nacimiento');
        if (!formData.sexo) missing.push('Sexo');
        if (!formData.estado_civil) missing.push('Estado civil');
        if (!formData.pais) missing.push('País');
        if (!formData.departamento) missing.push('Departamento');
        if (!formData.municipio) missing.push('Municipio');
        if (!formData.direccion_correspondencia) missing.push('Dirección');
        // Validar mayor de edad
        if (formData.fecha_nacimiento) {
          const birth = new Date(formData.fecha_nacimiento);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const m = today.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
          if (age < 18) missing.push('Debes ser mayor de edad (mínimo 18 años)');
        }
        return missing.length > 0 ? `Campos obligatorios: ${missing.join(', ')}` : null;
      }
      case 2: {
        const missing = [];
        if (!formData.año_graduacion) missing.push('Período de graduación');
        if (!formData.fec_grado) missing.push('Fecha de grado');
        if (!formData.modalidad) missing.push('Modalidad');
        if (!formData.ningun_estudio_adicional && (!formData.estudios_adicionales || formData.estudios_adicionales.trim() === '')) missing.push('Estudios adicionales (escribe tus estudios o marca Ninguno)');
        if (formData.habla_otro_idioma && (!formData.cual_idioma || formData.cual_idioma.trim() === '')) missing.push('Especifica qué idiomas hablas');
        return missing.length > 0 ? `${missing.join('. ')}` : null;
      }
      case 3: {
        const missing = [];
        if (!formData.condicion_laboral) missing.push('Condición laboral');
        if (formData.condicion_laboral && formData.condicion_laboral !== 'Desempleado' && (!formData.ciudad_trabajo || formData.ciudad_trabajo.trim() === '')) missing.push('Ciudad de trabajo');
        if (!formData.tiempo_experiencia) missing.push('Tiempo de experiencia');
        if (!formData.area_desempeno) missing.push('Área de desempeño');
        if (formData.area_desempeno === 'Otro' && (!(formData as any).otra_area_desempeno || (formData as any).otra_area_desempeno.trim() === '')) missing.push('Especifique área de desempeño');
        if (!formData.labora_actualmente_en) missing.push('Dónde labora actualmente');
        if (formData.labora_actualmente_en === 'Otro' && (!(formData as any).otra_labor || (formData as any).otra_labor.trim() === '')) missing.push('Especifique dónde labora');
        if (!formData.ingreso_mensual) missing.push('Ingreso mensual');
        if (!formData.dificultad_conseguir_trabajo) missing.push('Dificultad para conseguir trabajo');
        if (formData.dificultad_conseguir_trabajo === 'Otro' && (!formData.otra_dificultad || formData.otra_dificultad.trim() === '')) missing.push('Especifique dificultad');
        return missing.length > 0 ? `${missing.join('. ')}` : null;
      }
      case 4: {
        const missing = [];
        if (!formData.lugar_residencia_primer_empleo || formData.lugar_residencia_primer_empleo.trim() === '') missing.push('Lugar de residencia en el primer empleo (escribe "No aplica" si no has tenido)');
        if (!formData.acceso_primer_empleo) missing.push('Acceso al primer empleo');
        if (!formData.medio_obtencion_empleo) missing.push('Medio de obtención de empleo');
        if (formData.medio_obtencion_empleo === 'Otro' && (!(formData as any).otro_medio_empleo || (formData as any).otro_medio_empleo.trim() === '')) missing.push('Especifique medio de obtención');
        if (!formData.cantidad_empleos) missing.push('Cantidad de empleos');
        return missing.length > 0 ? `${missing.join('. ')}` : null;
      }
      case 5: {
        const missing = [];
        if (!formData.participa_redes) missing.push('Participación en redes');
        if (formData.participa_redes && formData.participa_redes !== '' && formData.participa_redes !== 'Ninguna' && (!formData.tipo_red || formData.tipo_red === '')) missing.push('Tipo de red');
        if (formData.tipo_red === 'Otro' && (!(formData as any).otra_red || (formData as any).otra_red.trim() === '')) missing.push('Especifique tipo de red');
        if (formData.ha_recibido_reconocimiento && (!formData.tipo_reconocimiento || formData.tipo_reconocimiento === '')) missing.push('Tipo de reconocimiento');
        if (formData.tipo_reconocimiento === 'Otro' && (!formData.otro_reconocimiento || formData.otro_reconocimiento.trim() === '')) missing.push('Especifique tipo de reconocimiento');
        return missing.length > 0 ? `${missing.join('. ')}` : null;
      }
      case 6: {
        const missing = [];
        if (formData.estuvo_exterior_estudio && (!formData.pais_estudio || formData.pais_estudio.trim() === '')) missing.push('País de estudio en el exterior');
        if (formData.estuvo_exterior_trabajo) {
          if (!formData.pais_trabajo || formData.pais_trabajo.trim() === '') missing.push('País de trabajo en el exterior');
          if (!formData.tiempo_exterior_trabajo) missing.push('Tiempo en el exterior por trabajo');
          if (!formData.area_desempeno_exterior) missing.push('Área de desempeño en el exterior');
          if (formData.area_desempeno_exterior === 'Otro' && (!formData.otra_area_exterior || formData.otra_area_exterior.trim() === '')) missing.push('Especifique área exterior');
        }
        return missing.length > 0 ? `${missing.join('. ')}` : null;
      }
      case 7: {
        const missing = [];
        if (!formData.donde_realizar_estudios) missing.push('Dónde realizaría estudios');
        if (!formData.cursaria_estudios_unimar) missing.push('Cursaría estudios en UNIMAR');
        if (!formData.tipo_formacion_futura) missing.push('Tipo de formación futura');
        return missing.length > 0 ? `${missing.join('. ')}` : null;
      }
      default:
        return null;
    }
  };

  const nextStep = () => {
    const validationError = validateStep(currentStep);
    if (!validationError) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    'Datos Personales',
    'Informacion Academica',
    'Situacion Laboral',
    'Primer Empleo',
    'Reconocimientos y Redes',
    'Experiencia Internacional',
    'Formacion Futura'
  ];

  // Verificar si el usuario está cargado
  if (!user) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            {user?.hasCompletedProfile ? 'Actualizar Información' : 'Encuesta de Seguimiento a Egresados'}
          </h1>
          <p className="text-gray-600">
            Universidad Mariana - Esp. Sistemas Integrados de Gestión
          </p>
          {user?.hasCompletedProfile && (
            <p className="text-sm text-blue-600 mt-2">
              Modifica los campos que desees actualizar y guarda los cambios
            </p>
          )}
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
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-sm font-medium text-gray-700">
              Paso {currentStep} de {steps.length}: {steps[currentStep - 1]}
            </p>
            <p className="text-sm text-gray-500">
              {Math.round((currentStep / steps.length) * 100)}% completado
            </p>
          </div>
          
          {/* Indicador de campos obligatorios */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <span className="text-red-500 font-bold">*</span> Campos obligatorios. 
              {user?.hasCompletedProfile 
                ? 'Modifica los campos que desees actualizar.'
                : 'Complete todos los campos marcados para continuar al siguiente paso.'
              }
            </p>
            {user?.hasCompletedProfile && (
              <p className="text-xs text-green-600 mt-1">
                ✓ Tus datos actuales están cargados en el formulario
              </p>
            )}
          </div>

          {/* Aviso de actualización anual obligatoria */}
          {localStorage.getItem('requiresUpdate') === 'true' && (
            <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg">
              <p className="text-sm text-orange-800 font-semibold">⚠️ Actualización anual requerida</p>
              <p className="text-xs text-orange-700 mt-1">
                Ha pasado más de un año desde tu última actualización de datos. Por favor revisa y actualiza tu información antes de continuar usando la plataforma.
              </p>
            </div>
          )}
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {showSuccess ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">¡Perfil Completado Exitosamente!</h2>
              <p className="text-gray-600 mb-6">
                Gracias por completar tu información. Tu perfil ha sido actualizado correctamente.
              </p>
              <div className="space-y-4">
                <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span>Redirigiendo automáticamente...</span>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => navigate('/profile')}
                    className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Ver Mi Perfil
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Ir al Inicio
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6 animate-pulse">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">⚠️</span>
                    <div>
                      <p className="text-sm font-bold text-red-800 mb-1">Campos incompletos</p>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
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
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.nombre ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Apellido <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      required
                      value={formData.apellido}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.apellido ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de nacimiento <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="fecha_nacimiento"
                      required
                      value={formData.fecha_nacimiento}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.fecha_nacimiento ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sexo <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="sexo"
                      required
                      value={formData.sexo}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.sexo ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estado civil <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="estado_civil"
                      required
                      value={formData.estado_civil}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.estado_civil ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Soltero">Soltero</option>
                      <option value="Casado/unión libre">Casado/unión libre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.telefono ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      País <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pais"
                      required
                      value={formData.pais}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.pais ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Departamento <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="departamento"
                      required
                      value={formData.departamento}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.departamento ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Municipio <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="municipio"
                      required
                      value={formData.municipio}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.municipio ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dirección de correspondencia <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="direccion_correspondencia"
                      required
                      value={formData.direccion_correspondencia}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.direccion_correspondencia ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2: Información Académica */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  INFORMACIÓN ACADÉMICA
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Programa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="programa"
                      required
                      value="Especialización en Sistemas Integrados de Gestión"
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Período de graduación <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="año_graduacion"
                      required
                      value={formData.año_graduacion}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.año_graduacion ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccione...</option>
                      <option value="2025-1">2025-1</option>
                      <option value="2025-2">2025-2</option>
                      <option value="2026-1">2026-1</option>
                      <option value="2026-2">2026-2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de grado
                    </label>
                    <input
                      type="date"
                      name="fec_grado"
                      value={formData.fec_grado}
                      onChange={handleChange}
                      min="2025-01-01"
                      max="2026-12-31"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Modalidad <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="modalidad"
                      required
                      value={formData.modalidad}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.modalidad ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Virtual">Virtual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Estudios Adicionales</h3>
                  <p className="text-sm text-gray-500 mb-3">Escribe tus estudios adicionales (uno por línea) o marca "Ninguno"</p>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="ningun_estudio_adicional"
                        checked={formData.ningun_estudio_adicional}
                        onChange={handleChange}
                        className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Ningún estudio adicional</span>
                    </label>
                    {!formData.ningun_estudio_adicional && (
                      <div>
                        <textarea
                          name="estudios_adicionales"
                          value={formData.estudios_adicionales}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Ej: Diplomado en Gestión de Calidad&#10;Maestría en Administración&#10;Curso SENA en Auditoría"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Idiomas</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="habla_otro_idioma"
                        checked={formData.habla_otro_idioma}
                        onChange={handleChange}
                        className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">¿Habla otro idioma?</span>
                    </label>
                    {formData.habla_otro_idioma && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          ¿Cuáles idiomas? (separa con comas)
                        </label>
                        <input
                          type="text"
                          name="cual_idioma"
                          value={formData.cual_idioma}
                          onChange={handleChange}
                          placeholder="Ej: Inglés, Francés, Portugués"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PASO 3: Situación Laboral */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  SITUACIÓN LABORAL ACTUAL
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Condición laboral <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="condicion_laboral"
                      required
                      value={formData.condicion_laboral}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.condicion_laboral ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Desempleado">Desempleado</option>
                      <option value="Independiente">Independiente</option>
                      <option value="Empleado e independiente">Empleado e independiente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ciudad de trabajo
                    </label>
                    <input
                      type="text"
                      name="ciudad_trabajo"
                      value={formData.ciudad_trabajo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tiempo de experiencia <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="tiempo_experiencia"
                      required
                      value={formData.tiempo_experiencia}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        !formData.tiempo_experiencia ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Menos de un año">Menos de un año</option>
                      <option value="Entre 1 año y 3">Entre 1 año y 3</option>
                      <option value="Más de 4 años">Más de 4 años</option>
                      <option value="No he tenido experiencia laboral">No he tenido experiencia laboral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Labora actualmente en
                    </label>
                    <select
                      name="labora_actualmente_en"
                      value={formData.labora_actualmente_en}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Empresas sociales del estado">Empresas sociales del estado</option>
                      <option value="Entidades asistenciales privadas">Entidades asistenciales privadas</option>
                      <option value="Empresas promotoras de salud">Empresas promotoras de salud</option>
                      <option value="Es independiente, el trabajo está relacionado con el área de formación">Es independiente, el trabajo está relacionado con el área de formación</option>
                      <option value="Es independiente">Es independiente</option>
                      <option value="Consultorio medico">Consultorio médico</option>
                      <option value="ONG">ONG</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  {formData.labora_actualmente_en === 'Otro' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Especifique</label>
                      <input type="text" name="otra_labor" value={(formData as any).otra_labor || ''} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ingreso mensual
                    </label>
                    <select
                      name="ingreso_mensual"
                      value={formData.ingreso_mensual}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Desempleado">Desempleado</option>
                      <option value="Menos de 1 SMLV">Menos de 1 SMLV</option>
                      <option value="1 SMLV">1 SMLV</option>
                      <option value="2 SMLV">2 SMLV</option>
                      <option value="3 SMLV">3 SMLV</option>
                      <option value="4 SMLV">4 SMLV</option>
                      <option value="5 o Más SMLV">5 o Más SMLV</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Área de desempeño
                    </label>
                    <select
                      name="area_desempeno"
                      value={formData.area_desempeno}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Dirección o gerencia">Dirección o gerencia</option>
                      <option value="Administrativa">Administrativa</option>
                      <option value="Profesional de apoyo (instituto de salud)">Profesional de apoyo (instituto de salud)</option>
                      <option value="Docencia">Docencia</option>
                      <option value="Capacitaciones a personal de salud">Capacitaciones a personal de salud</option>
                      <option value="Consultor y asesor en temas de salud">Consultor y asesor en temas de salud</option>
                      <option value="Coordinador(a) de área o red">Coordinador(a) de área o red</option>
                      <option value="Nutrición normal o clínica">Nutrición normal o clínica</option>
                      <option value="Agroalimentaría e industrial">Agroalimentaría e industrial</option>
                      <option value="Nutrición comunitaria">Nutrición comunitaria</option>
                      <option value="Servicios de alimentación">Servicios de alimentación</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  {formData.area_desempeno === 'Otro' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Especifique área</label>
                      <input type="text" name="otra_area_desempeno" value={(formData as any).otra_area_desempeno || ''} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dificultad para conseguir trabajo
                    </label>
                    <select
                      name="dificultad_conseguir_trabajo"
                      value={formData.dificultad_conseguir_trabajo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="No tengo dificultad">No tengo dificultad</option>
                      <option value="Carece de la experiencia necesaria">Carece de la experiencia necesaria</option>
                      <option value="No hay oportunidades de trabajo">No hay oportunidades de trabajo</option>
                      <option value="El salario que le ofrecen es muy bajo">El salario que le ofrecen es muy bajo</option>
                      <option value="No encuentra trabajo en su campo de estudio">No encuentra trabajo en su campo de estudio</option>
                      <option value="No sabe cómo buscarlo">No sabe cómo buscarlo</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  {formData.dificultad_conseguir_trabajo === 'Otro' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Especifique otra dificultad
                      </label>
                      <input
                        type="text"
                        name="otra_dificultad"
                        value={formData.otra_dificultad}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PASO 4: Primer Empleo */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  PRIMER EMPLEO
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lugar de residencia en el primer empleo
                    </label>
                    <input
                      type="text"
                      name="lugar_residencia_primer_empleo"
                      value={formData.lugar_residencia_primer_empleo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Acceso al primer empleo
                    </label>
                    <select
                      name="acceso_primer_empleo"
                      value={formData.acceso_primer_empleo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Estaba trabajando antes de graduarme">Estaba trabajando antes de graduarme</option>
                      <option value="Inmediatamente al graduarse">Inmediatamente al graduarse</option>
                      <option value="Al mes de graduarse">Al mes de graduarse</option>
                      <option value="A los tres meses después de graduarse">A los tres meses después de graduarse</option>
                      <option value="A los 6 meses después de graduarse">A los 6 meses después de graduarse</option>
                      <option value="A los 12 meses después de graduarse">A los 12 meses después de graduarse</option>
                      <option value="No está laborando en el campo de formación profesional">No está laborando en el campo de formación profesional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Medio de obtención del empleo
                    </label>
                    <select
                      name="medio_obtencion_empleo"
                      value={formData.medio_obtencion_empleo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Bolsa de trabajo">Bolsa de trabajo</option>
                      <option value="Contactos personales, familiares o conocidos">Contactos personales, familiares o conocidos</option>
                      <option value="Bolsa de empleo de la UNIMAR">Bolsa de empleo de la UNIMAR</option>
                      <option value="Convocatorias de las Empresas sociales del estado">Convocatorias de las Empresas sociales del estado</option>
                      <option value="Portal web">Portal web</option>
                      <option value="Redes sociales( Linkedln, Facebook, Twitter )">Redes sociales (LinkedIn, Facebook, Twitter)</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  {formData.medio_obtencion_empleo === 'Otro' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Especifique otro medio</label>
                      <input type="text" name="otro_medio_empleo" value={(formData as any).otro_medio_empleo || ''} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cantidad de empleos
                    </label>
                    <select
                      name="cantidad_empleos"
                      value={formData.cantidad_empleos}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Uno">Uno</option>
                      <option value="Más de tres empleos en diferentes áreas">Más de tres empleos en diferentes áreas</option>
                      <option value="Solo me he desempeñado en el campo que inicie">Solo me he desempeñado en el campo que inicié</option>
                      <option value="No me he desempeñado">No me he desempeñado</option>
                      <option value="Estoy desempleado">Estoy desempleado</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 5: Reconocimientos y Redes */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  RECONOCIMIENTOS Y PARTICIPACIÓN EN REDES
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Reconocimiento Profesional</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="ha_recibido_reconocimiento"
                          checked={formData.ha_recibido_reconocimiento}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">¿Ha recibido reconocimiento profesional?</span>
                      </label>

                      {formData.ha_recibido_reconocimiento && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Tipo de reconocimiento
                            </label>
                            <select
                              name="tipo_reconocimiento"
                              value={formData.tipo_reconocimiento}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              <option value="">Seleccione...</option>
                              <option value="Académico">Académico</option>
                              <option value="Político">Político</option>
                              <option value="Laboral">Laboral</option>
                              <option value="Social">Social</option>
                              <option value="Relación docencia servicio">Relación docencia servicio</option>
                              <option value="Cultural">Cultural</option>
                              <option value="Otro">Otro</option>
                            </select>
                          </div>

                          {formData.tipo_reconocimiento === 'Otro' && (
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Especifique otro reconocimiento
                              </label>
                              <input
                                type="text"
                                name="otro_reconocimiento"
                                value={formData.otro_reconocimiento}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Participación en Redes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Participa en redes
                        </label>
                        <select
                          name="participa_redes"
                          value={formData.participa_redes}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Seleccione...</option>
                          <option value="Regional">Regional</option>
                          <option value="Nacional">Nacional</option>
                          <option value="Internacional">Internacional</option>
                          <option value="Ninguna">Ninguna</option>
                        </select>
                      </div>

                      {formData.participa_redes && formData.participa_redes !== 'Ninguna' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tipo de red
                        </label>
                        <select
                          name="tipo_red"
                          value={formData.tipo_red}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Seleccione...</option>
                          <option value="Académica/científica">Académica/científica</option>
                          <option value="Asociación de profesionales">Asociación de profesionales</option>
                          <option value="Agremiación profesional (COLNUD, ACODIN)">Agremiación profesional (COLNUD, ACODIN)</option>
                          <option value="Culturales">Culturales</option>
                          <option value="Otra">Otra</option>
                        </select>
                      </div>
                      )}

                      {formData.tipo_red === 'Otra' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Especifique</label>
                        <input type="text" name="otra_red" value={(formData as any).otra_red || ''} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                      </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Producción Académica</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="libros_publicados"
                          checked={formData.libros_publicados}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Libros publicados</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="capitulos_libros"
                          checked={formData.capitulos_libros}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Capítulos de libros</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="patentes"
                          checked={formData.patentes}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Patentes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="politicas_publicas"
                          checked={formData.politicas_publicas}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Políticas públicas</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="ninguna_produccion"
                          checked={formData.ninguna_produccion}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Ninguna producción académica</span>
                      </label>
                      {!formData.ninguna_produccion && (
                        <div className="mt-3">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Otra producción (especifique)</label>
                          <input type="text" name="otra_produccion" value={(formData as any).otra_produccion || ''} onChange={handleChange} placeholder="Ej: Artículos científicos, ponencias..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 6: Experiencia Internacional */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  EXPERIENCIA INTERNACIONAL
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Experiencia de Estudio</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="estuvo_exterior_estudio"
                          checked={formData.estuvo_exterior_estudio}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">¿Ha estado en el exterior por estudios?</span>
                      </label>

                      {formData.estuvo_exterior_estudio && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            País de estudio
                          </label>
                          <input
                            type="text"
                            name="pais_estudio"
                            value={formData.pais_estudio}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Experiencia de Trabajo</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="estuvo_exterior_trabajo"
                          checked={formData.estuvo_exterior_trabajo}
                          onChange={handleChange}
                          className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">¿Ha estado en el exterior por trabajo?</span>
                      </label>

                      {formData.estuvo_exterior_trabajo && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              País de trabajo
                            </label>
                            <input
                              type="text"
                              name="pais_trabajo"
                              value={formData.pais_trabajo}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Tiempo en el exterior
                            </label>
                            <select
                              name="tiempo_exterior_trabajo"
                              value={formData.tiempo_exterior_trabajo}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              <option value="">Seleccione...</option>
                              <option value="Menos de un mes">Menos de un mes</option>
                              <option value="Más de 2 meses">Más de 2 meses</option>
                              <option value="Más de 6 meses">Más de 6 meses</option>
                              <option value="Más de un año">Más de un año</option>

                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Área de desempeño en el exterior
                            </label>
                            <select
                              name="area_desempeno_exterior"
                              value={formData.area_desempeno_exterior}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              <option value="">Seleccione...</option>
                              <option value="Dirección de procesos">Dirección de procesos</option>
                              <option value="Administrativa">Administrativa</option>
                              <option value="Profesional de apoyo">Profesional de apoyo</option>
                              <option value="Docencia">Docencia</option>
                              <option value="Otro">Otro</option>
                            </select>
                          </div>

                          {formData.area_desempeno_exterior === 'Otro' && (
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Especifique otra área
                              </label>
                              <input
                                type="text"
                                name="otra_area_exterior"
                                value={formData.otra_area_exterior}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 7: Formacion Futura */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  CURSOS, SEMINARIOS Y FORMACIÓN FUTURA
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Dónde realizaría estudios?
                    </label>
                    <select
                      name="donde_realizar_estudios"
                      value={formData.donde_realizar_estudios}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Exterior">Exterior</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Cursaría estudios en UNIMAR?
                    </label>
                    <select
                      name="cursaria_estudios_unimar"
                      value={formData.cursaria_estudios_unimar}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Si me gustaría">Sí me gustaría</option>
                      <option value="No me gustaría">No me gustaría</option>
                      <option value="Ya estoy cursando otros estudios en la institución">Ya estoy cursando otros estudios en la institución</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de formación futura
                    </label>
                    <select
                      name="tipo_formacion_futura"
                      value={formData.tipo_formacion_futura}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Estudios en idiomas">Estudios en idiomas</option>
                      <option value="Seminarios/cursos/diplomados">Seminarios/cursos/diplomados</option>
                      <option value="Programa técnico y tecnológico">Programa técnico y tecnológico</option>
                      <option value="Programa universitario">Programa universitario</option>
                      <option value="Especialización">Especialización</option>
                      <option value="Maestría">Maestría</option>
                      <option value="Doctorado">Doctorado</option>
                    </select>
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
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-3 bg-secondary text-primary rounded-lg font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50"
                >
                  <CheckCircle size={20} className="mr-2" />
                  {loading ? 'Guardando...' : 'Finalizar'}
                </button>
              )}
            </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePageFull;
