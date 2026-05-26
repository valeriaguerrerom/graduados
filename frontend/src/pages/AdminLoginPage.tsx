import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, Shield } from 'lucide-react';
import { API_URL } from '../config';

const AdminLoginPage: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('admin', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else { setError(data.error || 'Credenciales incorrectas'); }
    } catch { setError('Error de conexion'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full shadow-lg inline-block mb-4">
            <Shield size={48} className="text-gray-800" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Panel Administrativo</h2>
          <p className="text-gray-400">Acceso restringido</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center"><AlertCircle className="text-red-500 mr-2" size={20} /><p className="text-sm text-red-700">{error}</p></div>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="text" required value={cedula} onChange={(e) => setCedula(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800" placeholder="admin" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contrasena</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50">
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
        <div className="mt-6 text-center">
          <a href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">← Volver al login</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
