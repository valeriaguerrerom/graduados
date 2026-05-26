import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, User, AlertCircle, GraduationCap } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(cedula, password);
      if (result.success) {
        if (result.rol === 'admin') {
          navigate('/admin/dashboard');
        } else if (result.rol === 'lider') {
          navigate('/leader/dashboard');
        } else {
          // Egresado - verificar si completó el perfil
          const savedUser = sessionStorage.getItem('user');
          const userData = savedUser ? JSON.parse(savedUser) : null;
          if (!userData?.hasCompletedProfile) {
            navigate('/complete-profile');
          } else {
            // Verificar si necesita actualizar (más de 1 año desde última actualización)
            const updatedAt = userData?.updated_at;
            if (updatedAt) {
              const lastUpdate = new Date(updatedAt);
              const oneYearAgo = new Date();
              oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
              if (lastUpdate < oneYearAgo) {
                localStorage.setItem('requiresUpdate', 'true');
                navigate('/complete-profile');
                return;
              }
            }
            navigate('/');
          }
        }
      } else {
        setError('Cédula o contraseña incorrecta. Por favor, intenta de nuevo.');
      }
    } catch (err: any) {
      // Verificar si el error es porque no completó la encuesta
      if (err.requiresSurvey) {
        setError('');
        if (window.confirm('Debes completar la encuesta de satisfacción antes de iniciar sesión. ¿Deseas completarla ahora?')) {
          navigate('/satisfaction-survey');
        }
      } else {
        setError('Error al iniciar sesión. Por favor, intenta más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center py-4 px-4">
      <div className="max-w-md w-full">
        {/* Logo y Título */}
        <div className="text-center mb-5">
          <div className="flex justify-center mb-3">
            <div className="bg-white p-2.5 rounded-full shadow-lg">
              <img 
                src="/src/assets/images/logo-umariana.png" 
                alt="Universidad Mariana" 
                className="h-14 w-14 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <GraduationCap size={32} className="text-primary hidden" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Universidad Mariana</h2>
          <p className="text-secondary text-sm font-semibold">Esp. Sistemas Integrados de Gestion</p>
        </div>

        {/* Formulario de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center">
                  <AlertCircle className="text-red-500 mr-2" size={20} />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="cedula" className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Cédula
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400" size={20} />
                </div>
                <input
                  id="cedula"
                  type="text"
                  required
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Ingresa tu número de cédula"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Recordarme</label>
              </div>
              <div className="flex items-center">
                <input id="datos" type="checkbox" required className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded flex-shrink-0" />
                <label htmlFor="datos" className="ml-2 block text-sm text-gray-700">
                  Autorizo el tratamiento de datos segun{' '}
                  <a href="https://www.umariana.edu.co/politicas-proteccion-datos.html" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                    Politicas de proteccion de datos
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Información de ayuda */}
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-700 text-center">
              Si eres graduado y no tienes acceso, contacta al correo{' '}
              <a href="mailto:egresadosespsistintegradosg@umariana.edu.co" className="text-primary font-semibold hover:underline">
                egresadosespsistintegradosg@umariana.edu.co
              </a>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-white hover:text-secondary transition-colors text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

