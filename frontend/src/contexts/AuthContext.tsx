import React, { createContext, useContext, useState, useEffect } from 'react';

import { API_URL } from '../config';

interface User {
  id: string;
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  programa: string;
  añoGraduacion: string;
  hasCompletedProfile: boolean;
  
  // Datos socioeconómicos y demográficos
  fecha_nacimiento?: string;
  sexo?: string;
  estado_civil?: string;
  pais?: string;
  departamento?: string;
  municipio?: string;
  direccion_correspondencia?: string;
  
  // Información académica
  año_graduacion?: string;
  fec_grado?: string;
  modalidad?: string;
  
  // Estudios adicionales
  postgrados_salud?: boolean;
  diplomados_actualizacion?: boolean;
  cursos_sena?: boolean;
  ningun_estudio_adicional?: boolean;
  
  // Idiomas
  habla_otro_idioma?: boolean;
  cual_idioma?: string;
  
  // Situación laboral
  condicion_laboral?: string;
  ciudad_trabajo?: string;
  tiempo_experiencia?: string;
  labora_actualmente_en?: string;
  ingreso_mensual?: string;
  area_desempeno?: string;
  dificultad_conseguir_trabajo?: string;
  otra_dificultad?: string;
  
  // Primer empleo
  lugar_residencia_primer_empleo?: string;
  acceso_primer_empleo?: string;
  medio_obtencion_empleo?: string;
  cantidad_empleos?: string;
  
  // Reconocimientos
  ha_recibido_reconocimiento?: boolean;
  tipo_reconocimiento?: string;
  otro_reconocimiento?: string;
  
  // Redes
  participa_redes?: string;
  tipo_red?: string;
  
  // Producción académica
  libros_publicados?: boolean;
  capitulos_libros?: boolean;
  patentes?: boolean;
  politicas_publicas?: boolean;
  ninguna_produccion?: boolean;
  
  // Experiencia internacional
  estuvo_exterior_estudio?: boolean;
  pais_estudio?: string;
  estuvo_exterior_trabajo?: boolean;
  pais_trabajo?: string;
  tiempo_exterior_trabajo?: string;
  area_desempeno_exterior?: string;
  otra_area_exterior?: string;
  
  // Formación futura
  donde_realizar_estudios?: string;
  cursaria_estudios_unimar?: string;
  tipo_formacion_futura?: string;
  aspecto_mejorar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (cedula: string, password: string) => Promise<{ success: boolean; rol?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar sesión (sessionStorage se borra al cerrar navegador)
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // Limpiar localStorage viejo si existe
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  }, []);

  // Cierre de sesión por inactividad (15 minutos)
  useEffect(() => {
    if (!user) return;
    let timeout: ReturnType<typeof setTimeout>;
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutos

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setUser(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('admin');
        sessionStorage.removeItem('leader');
        localStorage.removeItem('admin');
        localStorage.removeItem('leader');
        localStorage.removeItem('requiresUpdate');
        window.location.href = '/login';
      }, INACTIVITY_LIMIT);
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [user]);

  const login = async (cedula: string, password: string): Promise<{ success: boolean; rol?: string }> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cedula, password }),
      });

      const data = await response.json();

      // Si el error es porque no completó la encuesta
      if (response.status === 403 && data.requiresSurvey) {
        throw { requiresSurvey: true, message: data.error };
      }

      if (!response.ok) {
        return { success: false };
      }
      
      if (data.success && data.user) {
        // Para admin y lider, guardar en localStorage separado
        if (data.rol === 'admin') {
          localStorage.setItem('admin', JSON.stringify(data.user));
          return { success: true, rol: 'admin' };
        } else if (data.rol === 'lider') {
          localStorage.setItem('leader', JSON.stringify(data.user));
          return { success: true, rol: 'lider' };
        }
        
        // Egresado
        setUser(data.user);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, rol: 'egresado' };
      }
      
      return { success: false };
    } catch (error: any) {
      console.error('Error en login:', error);
      // Re-lanzar el error si es por la encuesta
      if (error.requiresSurvey) {
        throw error;
      }
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('leader');
    localStorage.removeItem('requiresUpdate');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      const response = await fetch(`${API_URL}/user/${user.cedula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error('❌ Error del servidor:', response.status, errData);
        return false;
      }

      const result = await response.json();
      console.log('📦 Respuesta del servidor:', result);
      
      if (result.success && result.user) {
        console.log('✅ Usuario actualizado:', result.user);
        // Actualizar el usuario con todos los nuevos datos
        const updatedUser = { 
          ...user, 
          ...result.user,
          hasCompletedProfile: true // Asegurar que se marque como completado
        };
        setUser(updatedUser);
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
      }
      
      console.log('❌ Error del servidor:', result);
      return false;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
