import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, GraduationCap, Edit, MapPin, Calendar, 
  Briefcase, Award, Globe, BookOpen,
  Mail, Phone, Home, CheckCircle, Camera
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { API_URL } from '../config';

const ProfilePageComplete: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  if (!user) {
    return null;
  }

  const InfoCard = ({ title, icon: Icon, children, className = "" }: { 
    title: string; 
    icon: any; 
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="bg-gradient-to-r from-primary to-primary-light p-4 rounded-t-xl">
        <h2 className="text-lg font-bold text-white flex items-center">
          <Icon className="mr-2" size={20} />
          {title}
        </h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  const formatDate = (val: string) => {
    if (!val || val === '0000-00-00') return null;
    const d = new Date(val + 'T00:00:00');
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Resolver campos "Otro" mostrando el valor especificado
  const resolveOtro = (value: any, otroValue: any) => {
    if (!value) return null;
    if (value === 'Otro' && otroValue) return otroValue;
    return value;
  };

  const InfoItem = ({ label, value, icon: Icon }: { label: string; value: any; icon?: any }) => {
    if (!value || value === '' || value === false || value === '0000' || value === '0000-00-00' || value === 0 || value === '0' || value === '00') return null;
    
    // Formatear fechas
    let displayValue = value;
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      displayValue = formatDate(value) || value;
    }
    
    return (
      <div className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-b-0">
        {Icon && <Icon size={16} className="text-primary mt-1 flex-shrink-0" />}
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="text-gray-900 font-medium">{typeof displayValue === 'boolean' ? 'Sí' : displayValue}</p>
        </div>
      </div>
    );
  };

  const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'info' }) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      info: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
        <CheckCircle size={12} className="mr-1" />
        {children}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="relative group">
                {(user as any).foto_url ? (
                  <img src={(user as any).foto_url} alt="Foto de perfil" className="w-20 h-20 rounded-full object-cover border-4 border-white/30" />
                ) : (
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                    <User className="text-white" size={48} />
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={20} className="text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingPhoto(true);
                    try {
                      const formData = new FormData();
                      formData.append('imagen', file);
                      const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
                      const data = await res.json();
                      if (data.success) {
                        await updateProfile({ foto_url: data.url } as any);
                      }
                    } catch (err) { console.error('Error subiendo foto:', err); }
                    finally { setUploadingPhoto(false); }
                  }} />
                </label>
                {uploadingPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {user.nombre} {user.apellido}
                </h1>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="info">{user.programa}</Badge>
                  {user.añoGraduacion && <Badge variant="success">Graduado {user.añoGraduacion}</Badge>}
                  {user.hasCompletedProfile && <Badge variant="success">Perfil Completo</Badge>}
                </div>
                <p className="text-white/80 text-sm">Cédula: {user.cedula}</p>
              </div>
            </div>
            <Link
              to="/complete-profile"
              className="flex items-center space-x-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              <Edit size={18} />
              <span>Actualizar Información</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información Personal */}
          <InfoCard title="Información Personal" icon={User} className="lg:col-span-1">
            <div className="space-y-1">
              <InfoItem label="Email" value={user.email} icon={Mail} />
              <InfoItem label="Teléfono" value={user.telefono} icon={Phone} />
              <InfoItem label="Fecha de nacimiento" value={user.fecha_nacimiento} icon={Calendar} />
              <InfoItem label="Sexo" value={user.sexo} />
              <InfoItem label="Estado civil" value={user.estado_civil} />
              <InfoItem label="País" value={user.pais} icon={Globe} />
              <InfoItem label="Departamento" value={user.departamento} />
              <InfoItem label="Municipio" value={user.municipio} />
              <InfoItem label="Dirección" value={user.direccion_correspondencia} icon={Home} />
            </div>
          </InfoCard>

          {/* Información Académica */}
          <InfoCard title="Información Académica" icon={GraduationCap} className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <InfoItem label="Programa" value={user.programa} />
                <InfoItem label="Año de graduación" value={user.año_graduacion} />
                <InfoItem label="Fecha de grado" value={user.fec_grado} />
                <InfoItem label="Modalidad" value={user.modalidad} />
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Estudios Adicionales</h4>
                {user.ningun_estudio_adicional === true ? (
                  <Badge>Ningún estudio adicional</Badge>
                ) : (user as any).estudios_adicionales ? (
                  <p className="text-sm text-gray-600 whitespace-pre-line">{(user as any).estudios_adicionales}</p>
                ) : (
                  <p className="text-sm text-gray-400">Sin información</p>
                )}
              </div>
                
                {user.habla_otro_idioma === true && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Idiomas</h4>
                    <Badge variant="info">{user.cual_idioma}</Badge>
                  </div>
                )}
            </div>
          </InfoCard>

          {/* Situación Laboral */}
          <InfoCard title="Situación Laboral Actual" icon={Briefcase} className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <InfoItem label="Condición laboral" value={user.condicion_laboral} />
                <InfoItem label="Ciudad de trabajo" value={user.ciudad_trabajo} icon={MapPin} />
                <InfoItem label="Tiempo de experiencia" value={user.tiempo_experiencia} />
                <InfoItem label="Área de desempeño" value={resolveOtro((user as any).area_desempeno, (user as any).otra_area_desempeno)} />
              </div>
              <div className="space-y-1">
                <InfoItem label="Labora actualmente en" value={resolveOtro((user as any).labora_actualmente_en, (user as any).otra_labor)} />
                <InfoItem label="Ingreso mensual" value={user.ingreso_mensual} />
                <InfoItem label="Dificultad para conseguir trabajo" value={resolveOtro((user as any).dificultad_conseguir_trabajo, (user as any).otra_dificultad)} />
                {user.otra_dificultad && <InfoItem label="Otra dificultad" value={user.otra_dificultad} />}
              </div>
            </div>
          </InfoCard>

          {/* Trayectoria Profesional */}
          <InfoCard title="Trayectoria Profesional" icon={Award} className="lg:col-span-1">
            <div className="space-y-4">
              <InfoItem label="Primer empleo - Lugar" value={user.lugar_residencia_primer_empleo} />
              <InfoItem label="Acceso al primer empleo" value={user.acceso_primer_empleo} />
              <InfoItem label="Medio de obtención" value={resolveOtro((user as any).medio_obtencion_empleo, (user as any).otro_medio_empleo)} />
              <InfoItem label="Cantidad de empleos" value={user.cantidad_empleos} />
              
              {user.ha_recibido_reconocimiento === true && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <Award size={16} className="mr-1" />
                    Reconocimientos
                  </h4>
                  <Badge variant="success">{resolveOtro((user as any).tipo_reconocimiento, (user as any).otro_reconocimiento)}</Badge>
                  {user.otro_reconocimiento && (
                    <p className="text-sm text-yellow-700 mt-1">{user.otro_reconocimiento}</p>
                  )}
                </div>
              )}
            </div>
          </InfoCard>

          {/* Actividades Académicas y Profesionales */}
          <InfoCard title="Actividades Académicas y Profesionales" icon={BookOpen} className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Participación en Redes */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Participación en Redes</h4>
                <div className="space-y-2">
                  {user.participa_redes && <Badge variant="info">Nivel: {user.participa_redes}</Badge>}
                  {(user as any).tipo_red && <Badge>{resolveOtro((user as any).tipo_red, (user as any).otra_red)}</Badge>}
                </div>
              </div>

              {/* Producción Académica */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Producción Académica</h4>
                <div className="flex flex-wrap gap-2">
                  {user.libros_publicados === true && <Badge variant="success">Libros</Badge>}
                  {user.capitulos_libros === true && <Badge variant="success">Capítulos</Badge>}
                  {user.patentes === true && <Badge variant="success">Patentes</Badge>}
                  {user.politicas_publicas === true && <Badge variant="success">Políticas Públicas</Badge>}
                  {user.ninguna_produccion === true && <Badge>Sin producción académica</Badge>}
                  {(user as any).otra_produccion && <p className="text-sm text-gray-600">{(user as any).otra_produccion}</p>}
                </div>
              </div>

              {/* Formación Futura */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Interés en Formación</h4>
                <div className="space-y-1">
                  <InfoItem label="Dónde estudiaría" value={user.donde_realizar_estudios} />
                  <InfoItem label="Estudios en UNIMAR" value={user.cursaria_estudios_unimar} />
                  <InfoItem label="Tipo de formación" value={user.tipo_formacion_futura} />
                </div>
              </div>
            </div>
          </InfoCard>

          {/* Experiencia Internacional */}
          {(user.estuvo_exterior_estudio === true || user.estuvo_exterior_trabajo === true) && (
            <InfoCard title="Experiencia Internacional" icon={Globe} className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.estuvo_exterior_estudio === true && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <GraduationCap size={16} className="mr-1" />
                      Estudios en el Exterior
                    </h4>
                    <Badge variant="info">{user.pais_estudio}</Badge>
                  </div>
                )}
                {user.estuvo_exterior_trabajo === true && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Briefcase size={16} className="mr-1" />
                      Trabajo en el Exterior
                    </h4>
                    <div className="space-y-1">
                      <Badge variant="success">{user.pais_trabajo}</Badge>
                      <p className="text-sm text-green-700">{user.tiempo_exterior_trabajo}</p>
                      <p className="text-sm text-green-700">{resolveOtro((user as any).area_desempeno_exterior, (user as any).otra_area_exterior)}</p>
                      {user.otra_area_exterior && <p className="text-xs text-green-600">{user.otra_area_exterior}</p>}
                    </div>
                  </div>
                )}
              </div>
            </InfoCard>
          )}

          {/* Sugerencias */}
          {user.aspecto_mejorar && (
            <InfoCard title="Sugerencias para Mejorar el Programa" icon={Edit} className="lg:col-span-1">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-900 leading-relaxed text-sm italic">"{user.aspecto_mejorar}"</p>
              </div>
            </InfoCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComplete;
